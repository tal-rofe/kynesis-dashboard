import type { APIGatewayProxyHandler } from 'aws-lambda';
import { fromZodError } from 'zod-validation-error';
import Bourne from '@hapi/bourne';
import { SQSClient, SendMessageCommand, type SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { pixelApiRequestBodySchema } from '@kynesis/common-functions-types';
import LoggerService from '@kynesis/lambda-logger';

import { SQS_SEND_MESSAGE_MAX_ATTEMPTS } from './constants/sqs';

export const handler: APIGatewayProxyHandler = async (event, context) => {
	const logger = new LoggerService(context.awsRequestId);

	// * Catch runtime errors only, so function code won't be exposed to end user (as AWS does for runtime errors)
	try {
		const requestBody = event.body;

		logger.info('Start processing request', { requestBody });

		if (!requestBody) {
			logger.info('Missing request body, abort');

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
			logger.error(`Failed to parse request body with an error: ${validatedRequestBody.error}`);

			const plainErrorText = fromZodError(validatedRequestBody.error).toString();

			return {
				statusCode: 400,
				body: JSON.stringify({ message: plainErrorText }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		// * Use default retry strategies of the SDK
		const sqsClient = new SQSClient({ region: process.env.AWS_REGION, maxAttempts: SQS_SEND_MESSAGE_MAX_ATTEMPTS });

		// * This will be defined because of API Gateway cors
		const originDomain = event.headers['host']!;

		/**
		 * * Use "MessageGroupId" so only 1 Lambda handles each email,
		 * * but multiple emails will be handled concurrently (AWS will scale the Lambdas)
		 */
		const sendMessageSqsCommand = new SendMessageCommand({
			QueueUrl: process.env.SQS_URL,
			MessageBody: JSON.stringify({ ...validatedRequestBody.data, apiIndex: 0, originDomain }),
			MessageGroupId: `${validatedRequestBody.data.email}#${originDomain}`,
		});

		let sendMessageSqsOutput: SendMessageCommandOutput;

		try {
			sendMessageSqsOutput = await sqsClient.send(sendMessageSqsCommand);
		} catch (error: unknown) {
			logger.error(`Failed to send SQS message with an error: ${error}`);

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Internal Server Error' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		logger.info('Successfully pushed message to SQS to be handled', {
			messageId: sendMessageSqsOutput.MessageId,
			awsRequestId: sendMessageSqsOutput.$metadata.requestId,
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Successfully collected pixel data' }),
			headers: {
				'Content-Type': 'application/json',
			},
		};
	} catch (error: unknown) {
		logger.error(`Runtime error: ${error}`);

		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Internal Server Error' }),
			headers: {
				'Content-Type': 'application/json',
			},
		};
	}
};
