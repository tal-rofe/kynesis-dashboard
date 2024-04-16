import got from 'got';
import type { ScheduledHandler } from 'aws-lambda';
import LoggerService from '@kynesis/lambda-logger';
import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';
import { SQSClient, SendMessageCommand, type SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { fromZodError } from 'zod-validation-error';
import type { z } from 'zod';

import { SQS_MAX_ATTEMPTS } from './constants/sqs';
import { API_CALL_DATA_INTERVAL_TIME, API_CALL_RETRIES, API_CALL_TIMEOUT } from './constants/http';
import { AccessTokenApiResponseSchema, type PixelDataItemSchema, PixelDataResponseSchema } from './schemas/http';

export const handler: ScheduledHandler = async (_, context) => {
	const logger = new LoggerService(context.awsRequestId);

	logger.info('Start processing EventBridge event');

	let accessTokenResponseData: unknown;

	try {
		accessTokenResponseData = await got
			.post('https://aws-prod-auth-service.bigdbm.com/oauth2/token', {
				body: new URLSearchParams({
					grant_type: 'client_credentials',
					scope: 'PixelCompany/Data',
					client_id: process.env.BIGBDM_CLIENT_ID,
					client_secret: process.env.BIGBDM_CLIENT_SECRET,
				}).toString(),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				timeout: { request: API_CALL_TIMEOUT },
				retry: {
					limit: API_CALL_RETRIES,
					methods: ['HEAD', 'OPTIONS', 'TRACE', 'POST'],
					// * Keep others (backoff limit, ...) as default
				},
			})
			.json();
	} catch (error) {
		logger.error(`Failed to retrieve access token with an error: ${error}`);

		return;
	}

	const validatedResponse = await AccessTokenApiResponseSchema.safeParseAsync(accessTokenResponseData);

	if (!validatedResponse.success) {
		const validationError = fromZodError(validatedResponse.error).toString();

		logger.error(`Invalid response data for access token API, with an error: ${validationError}`, { accessTokenResponseData });

		return;
	}

	let pixelResponseData: unknown;

	try {
		pixelResponseData = await got
			.post('https://aws-prod-api-idify.bigdbm.com/api/Company/Data', {
				json: {
					WebsiteId: 'yazif',
					StartDate: new Date(Date.now() - API_CALL_DATA_INTERVAL_TIME),
					PageNumber: 1,
					NumberOfItemsOnPage: 100,
				},
				headers: { 'Authorization': `Bearer ${validatedResponse.data.access_token}`, 'Content-Type': 'application/json' },
				timeout: { request: API_CALL_TIMEOUT },
				retry: {
					limit: API_CALL_RETRIES,
					methods: ['HEAD', 'OPTIONS', 'TRACE', 'POST'],
					// * Keep others (backoff limit, ...) as default
				},
			})
			.json();
	} catch (error) {
		logger.error(`Failed to collect pixel data with an error: ${error}`);

		return;
	}

	const validatedPixelData = await PixelDataResponseSchema.safeParseAsync(pixelResponseData);

	if (!validatedPixelData.success) {
		const validationError = fromZodError(validatedPixelData.error).toString();

		logger.error(`Invalid response data for pixel data API, with an error: ${validationError}`, { pixelResponseData });

		return;
	}

	const sqsClient = new SQSClient({ region: process.env.AWS_REGION, maxAttempts: SQS_MAX_ATTEMPTS });

	const sqsMessagesPromises = validatedPixelData.data.map(async (pixelItem) => {
		const alignedPixelItem = pixelItem as z.infer<typeof PixelDataItemSchema>;
		const sqsMessageBodyObject: PixelCollectionData = { ...alignedPixelItem.pageData[0]!, apiIndex: 0, originDomain: 'yazif.com' };

		const sendMessageSqsCommand = new SendMessageCommand({
			QueueUrl: process.env.SQS_URL,
			MessageBody: JSON.stringify(sqsMessageBodyObject),
			MessageGroupId: `${sqsMessageBodyObject.email}#${sqsMessageBodyObject.originDomain}`,
		});

		let sendMessageSqsOutput: SendMessageCommandOutput;

		try {
			sendMessageSqsOutput = await sqsClient.send(sendMessageSqsCommand);
		} catch (error) {
			logger.warn(`Failed to send SQS message with an error: ${error}`, { sqsMessageBodyObject });

			return;
		}

		logger.info('Successfully sent message to SQS to be handled', {
			sqsMessageBodyObject,
			messageId: sendMessageSqsOutput.MessageId,
			awsRequestId: sendMessageSqsOutput.$metadata.requestId,
		});
	});

	await Promise.all(sqsMessagesPromises);
};
