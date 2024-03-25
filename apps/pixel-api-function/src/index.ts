import type { APIGatewayProxyHandler } from 'aws-lambda';
import { fromZodError } from 'zod-validation-error';
import Bourne from '@hapi/bourne';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { pixelApiRequestBodySchema } from '@kynesis/common-functions-types';

export const handler: APIGatewayProxyHandler = async (event) => {
	// * Catch runtime errors only, so function code won't be exposed to end user
	try {
		const requestBody = event.body;

		console.log(`Request body is: ${requestBody}`);

		if (!requestBody) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Missing pixel data' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		// * JSON.parse() drop-in replacement with prototype poisoning protection
		const parsedRequestBody = Bourne.safeParse(requestBody);

		const validatedRequestBody = await pixelApiRequestBodySchema.safeParseAsync(parsedRequestBody);

		if (!validatedRequestBody.success) {
			console.log(`Failed to parse request body with an error: ${validatedRequestBody.error}`);

			const plainErrorText = fromZodError(validatedRequestBody.error).toString();

			return {
				statusCode: 400,
				body: JSON.stringify({ message: plainErrorText }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		const sqsClient = new SQSClient({ region: process.env.AWS_REGION, maxAttempts: 2 });

		const sendMessageSqsCommand = new SendMessageCommand({
			QueueUrl: process.env.SQS_URL,
			MessageBody: JSON.stringify({ ...validatedRequestBody.data, apiIndex: 0 }),
			MessageGroupId: validatedRequestBody.data.email,
		});

		try {
			await sqsClient.send(sendMessageSqsCommand);
		} catch (error: unknown) {
			console.log(`Failed to send SQS message with an error: ${error}`);

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Internal Server Error' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		console.log('Successfully pushed message to SQS to be handled');

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Successfully collected pixel data' }),
			headers: {
				'Content-Type': 'application/json',
			},
		};
	} catch (error: unknown) {
		console.log(`Runtime error: ${error}`);

		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Internal Server Error' }),
			headers: {
				'Content-Type': 'application/json',
			},
		};
	}
};
