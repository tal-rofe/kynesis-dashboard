import type { APIGatewayProxyHandler } from 'aws-lambda';
import { fromZodError } from 'zod-validation-error';
import got from 'got';
import { DynamoDBClient, PutItemCommand, type PutItemCommandOutput } from '@aws-sdk/client-dynamodb';
import LoggerService from '@kynesis/lambda-logger';

import { requestQueriesSchema } from './schemas/request-queries';
import type { SlackAuthResponse } from './interfaces/slack-auth-response';
import { DYNAMODB_MAX_ATTEMPTS } from './constants/dynamodb';

export const handler: APIGatewayProxyHandler = async (event, context) => {
	const logger = new LoggerService(context.awsRequestId);

	// * Catch runtime errors only, so function code won't be exposed to end user (as AWS does for runtime errors)
	try {
		const requestQuery = event.queryStringParameters;

		logger.info('Start processing request', { requestQuery });

		if (!requestQuery) {
			logger.info('Missing request queries, abort');

			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Missing request queries' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		const validatedRequestQueries = await requestQueriesSchema.safeParseAsync(requestQuery);

		if (!validatedRequestQueries.success) {
			logger.error(`Failed to parse request queries with an error: ${validatedRequestQueries.error}`);

			const plainErrorText = fromZodError(validatedRequestQueries.error).toString();

			return {
				statusCode: 400,
				body: JSON.stringify({ message: plainErrorText }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		const slackAuthRequestData = new FormData();

		slackAuthRequestData.set('code', validatedRequestQueries.data.code);
		slackAuthRequestData.set('client_id', process.env.SLACK_CLIENT_ID);
		slackAuthRequestData.set('client_secret', process.env.SLACK_CLIENT_SECRET);

		let slackCustomerWebhookUrl: string;
		let slackCustomerChannelName: string;

		try {
			const slackAuthResponse = await got
				.post('https://slack.com/api/oauth.v2.access', { body: slackAuthRequestData })
				.json<SlackAuthResponse>();

			if (!slackAuthResponse.ok) {
				throw slackAuthResponse.error;
			}

			slackCustomerWebhookUrl = slackAuthResponse.incoming_webhook.url;
			slackCustomerChannelName = slackAuthResponse.incoming_webhook.channel;
		} catch (error: unknown) {
			logger.error(`Failed to send Slack API call to get customer's webhook URL with an error: ${error}`);

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Internal Server Error' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		logger.info('Successfully retrieved Slack customer Webhook URL', { slackCustomerWebhookUrl });

		const dynamoDbClient = new DynamoDBClient({ region: process.env.AWS_REGION, maxAttempts: DYNAMODB_MAX_ATTEMPTS });

		const domainFirstIndex = slackCustomerChannelName.indexOf('[');
		const domainLastIndex = slackCustomerChannelName.indexOf(']');

		if (domainFirstIndex === -1 || domainLastIndex === -1 || domainLastIndex >= domainFirstIndex) {
			logger.info('Bad channel name format', { slackCustomerChannelName });

			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Bad channel name format' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		const putItemCommand = new PutItemCommand({
			TableName: process.env.DYNAMODB_TABLE_NAME,
			Item: {
				CustomerDomain: { S: slackCustomerChannelName.substring(domainFirstIndex + 1, domainLastIndex) },
				CustomerSlackWebhookURL: { S: slackCustomerWebhookUrl },
			},
		});

		let dynamoDbPutItemCommandOutput: PutItemCommandOutput;

		try {
			dynamoDbPutItemCommandOutput = await dynamoDbClient.send(putItemCommand);
		} catch (error: unknown) {
			logger.error(`Failed to put item in DynamoDB message with an error: ${error}`);

			return {
				statusCode: 500,
				body: JSON.stringify({ message: 'Internal Server Error' }),
				headers: {
					'Content-Type': 'application/json',
				},
			};
		}

		logger.info('Successfully put item in DynamoDB', {
			slackCustomerWebhookUrl,
			awsRequestId: dynamoDbPutItemCommandOutput.$metadata.requestId,
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Successfully registered Kynesis Slack webhook' }),
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
