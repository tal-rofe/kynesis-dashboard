import type { SQSHandler } from 'aws-lambda';
import { SQSClient, SendMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

import type { SqsBody } from './interfaces/sqs-body';
import { linkedinUrlApis } from './data/linkedin-url-apis';
import { getEnrichedData } from './apis/vetric/vetric';
import LoggerService from './services/logger';

export const handler: SQSHandler = async (event, context) => {
	const logger = new LoggerService(context.awsRequestId);

	// * As the ownership of the SQS is Kynesis, it will have valid message body
	const sqsMessage = event.Records[0]!;
	const messageBody = sqsMessage.body;
	const parsedMessageBody = JSON.parse(messageBody) as SqsBody;

	const sqsClient = new SQSClient({ region: process.env.AWS_REGION, maxAttempts: 3 });
	const deleteMessageSqsCommand = new DeleteMessageCommand({ QueueUrl: process.env.SQS_URL, ReceiptHandle: sqsMessage.receiptHandle });

	/**
	 * * Immediately delete the message because if processing it will fail, we just continue on to next API
	 * * we don't want to handle same message twice
	 */
	sqsClient
		.send(deleteMessageSqsCommand)
		.then(() => {
			logger.log('Successfully deleted SQS message');
		})
		.catch((error) => {
			logger.log(`Failed to delete SQS message with an error: ${error}`);
		});

	logger.log(`Start processing SQS message with body: ${messageBody}`);

	if (parsedMessageBody.apiIndex >= linkedinUrlApis.length) {
		logger.log('Got invalid index to process, abort process');

		return;
	}

	const apiHandler = linkedinUrlApis[parsedMessageBody.apiIndex]!;
	let linkedinUrl: string;

	try {
		linkedinUrl = await apiHandler.getLinkedinUrl(parsedMessageBody);
	} catch (error: unknown) {
		logger.log(`Failed to match Linkedin profile URL with pixel data, with an error: ${error}`);

		if (parsedMessageBody.apiIndex === linkedinUrlApis.length - 1) {
			logger.log('Failed to match Linkedin profile URL using all APIs providers');

			return;
		}

		// * Increment "apiIndex" to handle next API handler
		const sendMessageSqsCommand = new SendMessageCommand({
			QueueUrl: process.env.SQS_URL,
			MessageBody: JSON.stringify({ ...parsedMessageBody, apiIndex: parsedMessageBody.apiIndex + 1 }),
			MessageGroupId: `${parsedMessageBody.email}#${parsedMessageBody.originDomain}`,
		});

		try {
			await sqsClient.send(sendMessageSqsCommand);
		} catch (error: unknown) {
			logger.log(`Failed to send SQS message with an error: ${error}`);

			return;
		}

		logger.log('Successfully pushed message to SQS to be handled');

		return;
	}

	let enrichedData: Record<string, unknown>;

	try {
		enrichedData = await getEnrichedData(context.awsRequestId, linkedinUrl);
	} catch (error) {
		logger.log(`Failed to enrich data with an error: ${error}`);

		return;
	}

	logger.log('Successfully enriched data for Linkedin Profile');

	// TODO: Remove it when using Zapier..
	void enrichedData;
};
