import type { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
	const response = await Promise.resolve({ statusCode: 200, body: JSON.stringify({ event }) });

	return response;
};
