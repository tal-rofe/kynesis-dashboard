import type { SQSHandler } from 'aws-lambda';
import { SQSClient, SendMessageCommand, DeleteMessageCommand, type SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { DynamoDBClient, GetItemCommand, type GetItemCommandOutput } from '@aws-sdk/client-dynamodb';
import got from 'got';

import LoggerService from '@kynesis/lambda-logger';
import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';
import ErrorCode from '@kynesis/error-codes';

import { looseFirstNameLinkedinUrlApis, linkedinUrlApis } from './data/linkedin-url-apis';
import { getEnrichedData } from './apis/vetric/vetric';
import { DYNAMODB_MAX_ATTEMPTS } from './constants/dynamodb';
import { SQS_MAX_ATTEMPTS } from './constants/sqs';
import { SLACK_API_CALL_RETRIES, SLACK_API_CALL_TIMEOUT } from './constants/slack-api';
import { upsertVisitorWithEnrichedData, upsertVisitorWithLinkedinUrl } from './services/database';

export const handler: SQSHandler = async (event, context) => {
	const logger = new LoggerService(context.awsRequestId);

	// * As the ownership of the SQS is Kynesis, it will have valid message body
	const sqsMessage = event.Records[0]!;
	const messageBody = sqsMessage.body;
	const parsedMessageBody = JSON.parse(messageBody) as PixelCollectionData;

	logger.info('Start processing SQS message', { messageBody }, true);

	const sqsClient = new SQSClient({ region: process.env.AWS_REGION, maxAttempts: SQS_MAX_ATTEMPTS });
	const deleteMessageSqsCommand = new DeleteMessageCommand({ QueueUrl: process.env.SQS_URL, ReceiptHandle: sqsMessage.receiptHandle });

	/**
	 * * Immediately delete the message because if processing it fails, we just continue on to the next API
	 * * we don't want to handle same message twice
	 */
	sqsClient
		.send(deleteMessageSqsCommand)
		.then((deleteMessageSqsOutput) => {
			logger.info('Successfully deleted SQS message', {
				awsRequestId: deleteMessageSqsOutput.$metadata.requestId,
			});
		})
		.catch((error) => {
			logger.warn(`Failed to delete SQS message with an error: ${error}`, { errorCode: ErrorCode.DELETE_SQS_MESSAGE });
		});

	const linkedinUrlApisToUse = parsedMessageBody.firstName ? linkedinUrlApis : looseFirstNameLinkedinUrlApis;

	if (parsedMessageBody.apiIndex >= linkedinUrlApisToUse.length) {
		logger.error('Got invalid API handler index to process - abort process', {
			linkedinApiHandlerIndex: parsedMessageBody.apiIndex,
			maxLinkedinApiHandlerIndex: linkedinUrlApisToUse.length - 1,
			errorCode: ErrorCode.INVALID_LINKEDIN_URL_API_INDEX,
		});

		return;
	}

	const apiHandler = linkedinUrlApisToUse[parsedMessageBody.apiIndex]!;

	logger.info('Querying LinkedIn URL API handler', { linkedinApiHandlerIndex: parsedMessageBody.apiIndex }, true);

	let linkedinUrl: Awaited<ReturnType<typeof apiHandler.getLinkedinUrl>>;

	try {
		linkedinUrl = await apiHandler.getLinkedinUrl(parsedMessageBody);
	} catch (error) {
		logger.warn(`Failed to match LinkedIn profile URL with pixel data with an error: ${error}`, {
			errorCode: ErrorCode.LINKEDIN_URL_API_ONE,
		});

		if (parsedMessageBody.apiIndex === linkedinUrlApisToUse.length - 1) {
			logger.error('Failed to match Linkedin profile URL using all APIs providers', { errorCode: ErrorCode.LINKEDIN_URL_API_ALL });

			return;
		}

		logger.info('Sending SQS message to increment API handler index');

		// * Increment "apiIndex" to handle next API handler
		const sendMessageSqsCommand = new SendMessageCommand({
			QueueUrl: process.env.SQS_URL,
			MessageBody: JSON.stringify({ ...parsedMessageBody, apiIndex: parsedMessageBody.apiIndex + 1 }),
			MessageGroupId: `${parsedMessageBody.email}#${parsedMessageBody.originDomain}`,
		});

		let sendMessageSqsOutput: SendMessageCommandOutput;

		try {
			sendMessageSqsOutput = await sqsClient.send(sendMessageSqsCommand);
		} catch (error) {
			logger.error(`Failed to send SQS message with an error: ${error}`, { errorCode: ErrorCode.SEND_SQS_MESSAGE });

			return;
		}

		logger.info('Successfully sent message to SQS to be handled', {
			messageBody,
			messageId: sendMessageSqsOutput.MessageId,
			awsRequestId: sendMessageSqsOutput.$metadata.requestId,
		});

		return;
	}

	logger.info('Successfully retrieved LinkedIn URL', {
		linkedinUrl,
	});

	let enrichedData: Awaited<ReturnType<typeof getEnrichedData>>;

	try {
		enrichedData = await getEnrichedData(logger, linkedinUrl);
	} catch (error) {
		logger.error(`Failed to enrich data with an error: ${error}`, { errorCode: ErrorCode.VETRIC_ENRICHMENT });

		upsertVisitorWithLinkedinUrl(parsedMessageBody.email, linkedinUrl, parsedMessageBody.originDomain)
			.then(() => logger.info('Successfully upserted visitor in DB, with LinkedIn URL'))
			.catch((error) =>
				logger.warn(`Failed to upsert visitor with LinkedIn URL in DB with an error: ${error}`, { errorCode: ErrorCode.UPSERT_DB }),
			);

		return;
	}

	logger.info('Successfully enriched data for Linkedin Profile', { enrichedData });

	upsertVisitorWithEnrichedData(parsedMessageBody.email, enrichedData, parsedMessageBody.originDomain)
		.then(() => logger.info('Successfully upserted visitor in DB, with enriched data'))
		.catch((error) =>
			logger.warn(`Failed to upsert visitor with enriched data in DB with an error: ${error}`, { errorCode: ErrorCode.UPSERT_DB }),
		);

	const dynamoDbClient = new DynamoDBClient({ region: process.env.AWS_REGION, maxAttempts: DYNAMODB_MAX_ATTEMPTS });

	const getItemCommand = new GetItemCommand({
		TableName: process.env.DYNAMODB_TABLE_NAME,
		Key: {
			CustomerDomain: { S: parsedMessageBody.originDomain },
		},
	});

	let dynamoDbGetItemCommandOutput: GetItemCommandOutput;
	let customerSlackWebhookUrl: string;

	try {
		dynamoDbGetItemCommandOutput = await dynamoDbClient.send(getItemCommand);

		if (!dynamoDbGetItemCommandOutput.Item) {
			logger.error("Failed to retrieve customer's Slack Webhook URL from DynamoDB, got empty item", {
				awsRequestId: dynamoDbGetItemCommandOutput.$metadata.requestId,
				originDomain: parsedMessageBody.originDomain,
				errorCode: ErrorCode.DYNAMODB_INVALID_ITEM,
			});

			return;
		}

		customerSlackWebhookUrl = dynamoDbGetItemCommandOutput.Item['CustomerSlackWebhookURL']!.S!;
	} catch (error) {
		logger.error(`Failed to get item from DynamoDB with an error: ${error}`, { errorCode: ErrorCode.DYNAMODB_ACCESS });

		return;
	}

	logger.info("Successfully retrieved customer's Slack Webhook URL", {
		customerSlackWebhookUrl,
		awsRequestId: dynamoDbGetItemCommandOutput.$metadata.requestId,
	});

	try {
		const response = await got
			.post(customerSlackWebhookUrl, {
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: { request: SLACK_API_CALL_TIMEOUT },
				retry: {
					limit: SLACK_API_CALL_RETRIES,
					methods: ['HEAD', 'OPTIONS', 'TRACE', 'POST'],
					// * Keep others (backoff limit, ...) as default
				},
				json: { text: enrichedData },
			})
			.text();

		if (response !== 'ok') {
			logger.error(`Failed to send message to customer's Slack channel with response: ${response}`, {
				customerSlackWebhookUrl,
				response,
				errorCode: ErrorCode.SLACK_SEND_MESSAGE,
			});

			return;
		}
	} catch (error) {
		logger.error(`Failed to send message to customer's Slack channel with an error: ${error}`, {
			customerSlackWebhookUrl,
			errorCode: ErrorCode.SLACK_SEND_MESSAGE,
		});

		return;
	}

	logger.info("Successfully sent data to customer's Slack channel", { customerSlackWebhookUrl });
};
