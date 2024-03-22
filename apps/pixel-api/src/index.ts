import type { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async () => {
	const response = await Promise.resolve({
		statusCode: 200,
		body: '',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response;
};
