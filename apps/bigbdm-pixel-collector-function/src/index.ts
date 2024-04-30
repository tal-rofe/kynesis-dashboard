import got from 'got';
import type { ScheduledHandler } from 'aws-lambda';
import { SQSClient, SendMessageCommand, type SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { fromZodError } from 'zod-validation-error';
import type { z } from 'zod';

import LoggerService from '@kynesis/lambda-logger';
import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';
import ErrorCode from '@kynesis/error-codes';

import { SQS_MAX_ATTEMPTS } from './constants/sqs';
import { API_CALL_DATA_INTERVAL_TIME, API_CALL_RETRIES, API_CALL_TIMEOUT } from './constants/http';
import { AccessTokenApiResponseSchema, type PixelDataItemSchema, PixelDataResponseSchema } from './schemas/http';
import { customersWebsitesIds } from './data/customers-websites-ids';

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
		logger.error(`Failed to retrieve access token with an error: ${error}`, { errorCode: ErrorCode.BIGBDM_ACCESS_TOKEN_API });

		return;
	}

	const validatedResponse = await AccessTokenApiResponseSchema.safeParseAsync(accessTokenResponseData);

	if (!validatedResponse.success) {
		const validationError = fromZodError(validatedResponse.error).toString();

		logger.error(`Invalid response data for access token API, with an error: ${validationError}`, {
			accessTokenResponseData,
			errorCode: ErrorCode.BIGBDM_ACCESS_TOKEN_INVALID,
		});

		return;
	}

	const customersWebsitesResponsesPromises = customersWebsitesIds.map(async (customerWebsiteId) => {
		const response = await got
			.post('https://aws-prod-api-idify.bigdbm.com/api/Company/Data', {
				json: {
					WebsiteId: customerWebsiteId.websiteId,
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

		const validatedPixelData = await PixelDataResponseSchema.safeParseAsync(response);

		if (!validatedPixelData.success) {
			const validationError = fromZodError(validatedPixelData.error).toString();

			throw new Error(validationError);
		}

		return validatedPixelData.data as z.infer<typeof PixelDataItemSchema>[];
	});

	const customersWebsitesResponses = await Promise.allSettled(customersWebsitesResponsesPromises);

	const sqsClient = new SQSClient({ region: process.env.AWS_REGION, maxAttempts: SQS_MAX_ATTEMPTS });

	for (const [index, customersWebsitesResponse] of customersWebsitesResponses.entries()) {
		if (customersWebsitesResponse.status === 'rejected') {
			logger.warn(`Failed to collect pixel data for website with a reason: ${customersWebsitesResponse.reason}`, {
				websiteId: customersWebsitesIds[index]!.websiteId,
				errorCode: ErrorCode.BIGBDM_WEBSITE_ID_COLLECTION,
			});
		} else {
			for (const responseItem of customersWebsitesResponse.value) {
				const sqsMessageBodyObject: PixelCollectionData = {
					...responseItem.pageData[0]!,
					apiIndex: 0,
					originDomain: customersWebsitesIds[index]!.domain,
				};

				const sendMessageSqsCommand = new SendMessageCommand({
					QueueUrl: process.env.SQS_URL,
					MessageBody: JSON.stringify(sqsMessageBodyObject),
					MessageGroupId: `${sqsMessageBodyObject.email}#${sqsMessageBodyObject.originDomain}`,
				});

				let sendMessageSqsOutput: SendMessageCommandOutput;

				try {
					sendMessageSqsOutput = await sqsClient.send(sendMessageSqsCommand);
				} catch (error) {
					logger.warn(`Failed to send SQS message with an error: ${error}`, {
						sqsMessageBodyObject,
						errorCode: ErrorCode.SEND_SQS_MESSAGE,
					});

					continue;
				}

				logger.info('Successfully sent message to SQS to be handled', {
					sqsMessageBodyObject,
					messageId: sendMessageSqsOutput.MessageId,
					awsRequestId: sendMessageSqsOutput.$metadata.requestId,
				});
			}
		}
	}
};
