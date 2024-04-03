import type { SQSHandler } from 'aws-lambda';
import { SQSClient, SendMessageCommand, DeleteMessageCommand, type SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { DynamoDBClient, GetItemCommand, type GetItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { WebClient } from '@slack/web-api';

import type { SqsBody } from './interfaces/sqs-body';
import { linkedinUrlApis } from './data/linkedin-url-apis';
import { getEnrichedData } from './apis/vetric/vetric';
import LoggerService from './services/logger';
import { DYNAMODB_MAX_ATTEMPTS } from './constants/dynamodb';
import { SQS_MAX_ATTEMPTS } from './constants/sqs';

export const handler: SQSHandler = async (event, context) => {
	const logger = new LoggerService(context.awsRequestId);

	// * As the ownership of the SQS is Kynesis, it will have valid message body
	const sqsMessage = event.Records[0]!;
	const messageBody = sqsMessage.body;
	const parsedMessageBody = JSON.parse(messageBody) as SqsBody;

	logger.info('Start processing SQS message', { messageBody });

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
				messageBody,
			});
		})
		.catch((error) => {
			logger.warn(`Failed to delete SQS message with an error: ${error}`, { messageBody });
		});

	if (parsedMessageBody.apiIndex >= linkedinUrlApis.length) {
		logger.error('Got invalid API handler index to process - abort process', {
			linkedinApiHandlerIndex: parsedMessageBody.apiIndex,
			maxLinkedinApiHandlerIndex: linkedinUrlApis.length - 1,
		});

		return;
	}

	const apiHandler = linkedinUrlApis[parsedMessageBody.apiIndex]!;
	let linkedinUrl: string;

	logger.info('Querying LinkedIn URL API handler', { messageBody });

	try {
		linkedinUrl = await apiHandler.getLinkedinUrl(parsedMessageBody);
	} catch (error: unknown) {
		logger.error(`Failed to match Linkedin profile URL with pixel data with an error: ${error}`, {
			messageBody,
		});

		if (parsedMessageBody.apiIndex === linkedinUrlApis.length - 1) {
			logger.error('Failed to match Linkedin profile URL using all APIs providers', { messageBody });

			return;
		}

		logger.info('Sending SQS message to increment API handler index', {
			nextLinkedinApiHandlerIndex: parsedMessageBody.apiIndex + 1,
			messageBody,
		});

		// * Increment "apiIndex" to handle next API handler
		const sendMessageSqsCommand = new SendMessageCommand({
			QueueUrl: process.env.SQS_URL,
			MessageBody: JSON.stringify({ ...parsedMessageBody, apiIndex: parsedMessageBody.apiIndex + 1 }),
			MessageGroupId: `${parsedMessageBody.email}#${parsedMessageBody.originDomain}`,
		});

		let sendMessageSqsOutput: SendMessageCommandOutput;

		try {
			sendMessageSqsOutput = await sqsClient.send(sendMessageSqsCommand);
		} catch (error: unknown) {
			logger.error(`Failed to send SQS message with an error: ${error}`, { messageBody });

			return;
		}

		logger.info('Successfully pushed message to SQS to be handled', {
			messageBody,
			messageId: sendMessageSqsOutput.MessageId,
			awsRequestId: sendMessageSqsOutput.$metadata.requestId,
		});

		return;
	}

	logger.info('Successfully retrieved LinkedIn URL', {
		messageBody,
		linkedinUrl,
	});

	let enrichedData: Record<string, unknown>;

	try {
		enrichedData = await getEnrichedData(context.awsRequestId, linkedinUrl);
	} catch (error) {
		logger.error(`Failed to enrich data with an error: ${error}`, { messageBody });

		return;
	}

	logger.info('Successfully enriched data for Linkedin Profile', { messageBody });

	const dynamoDbClient = new DynamoDBClient({ region: process.env.AWS_REGION, maxAttempts: DYNAMODB_MAX_ATTEMPTS });

	const getItemCommand = new GetItemCommand({
		TableName: process.env.DYNAMODB_TABLE_NAME,
		Key: {
			CustomerDomain: { S: parsedMessageBody.originDomain },
		},
	});

	let dynamoDbGetItemCommandOutput: GetItemCommandOutput;
	let customerSlackChannelId: string;

	try {
		dynamoDbGetItemCommandOutput = await dynamoDbClient.send(getItemCommand);

		if (!dynamoDbGetItemCommandOutput.Item) {
			logger.error("Failed to retrieve customer's Slack channel ID from DynamoDB, got empty item", {
				messageBody,
				awsRequestId: dynamoDbGetItemCommandOutput.$metadata.requestId,
				originDomain: parsedMessageBody.originDomain,
			});

			return;
		}

		customerSlackChannelId = dynamoDbGetItemCommandOutput.Item['CustomerSlackChannelId']!.S!;
	} catch (error: unknown) {
		logger.error(`Failed to get item from DynamoDB with an error: ${error}`, { messageBody });

		return;
	}

	logger.info("Successfully retrieved customer's Slack channel ID", {
		messageBody,
		customerSlackChannelId,
		awsRequestId: dynamoDbGetItemCommandOutput.$metadata.requestId,
	});

	const slackClient = new WebClient(process.env.SLACK_TOKEN);

	try {
		await slackClient.chat.postMessage({
			text: JSON.stringify(enrichedData),
			channel: customerSlackChannelId,
		});
	} catch (error: unknown) {
		logger.error(`Failed to send message to customer's Slack channel with an error: ${error}`, { messageBody });

		return;
	}

	logger.info("Successfully sent data to customer's Slack channel", { messageBody, customerSlackChannelId });
};
