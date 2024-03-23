import type { APIGatewayProxyHandler } from 'aws-lambda';
import { fromZodError } from 'zod-validation-error';
import Bourne from '@hapi/bourne';

import RequestBodySchema from './schemas/request-body';

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

		const validatedRequestBody = await RequestBodySchema.safeParseAsync(parsedRequestBody);

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
