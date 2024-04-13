import path from 'node:path';

import type { ScheduledHandler } from 'aws-lambda';
import SftpClient from 'ssh2-sftp-client';
import LoggerService from '@kynesis/lambda-logger';
import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';
import { SQSClient, SendMessageCommand, type SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { fromZodError } from 'zod-validation-error';
import csvParser from 'csvtojson';

import { SFTP_CONNECTION_RETRIES, SFTP_HANDSHAKE_TIMEOUT } from './constants/sftp';
import { SQS_MAX_ATTEMPTS } from './constants/sqs';
import { PixelUnitSchema } from './schemas/pixel-unit-schema';

export const handler: ScheduledHandler = async (_, context) => {
	const logger = new LoggerService(context.awsRequestId);

	logger.info('Start processing EventBridge event. Setting up SFTP client');

	const sftpClient = new SftpClient('AtData SFTP Server');

	try {
		await sftpClient.connect({
			host: process.env.ATDATA_SFTP_HOST,
			port: +process.env.ATDATA_SFTP_PORT,
			username: process.env.ATDATA_SFTP_USERNAME,
			password: process.env.ATDATA_SFTP_PASSWORD,
			readyTimeout: SFTP_HANDSHAKE_TIMEOUT,
			retries: SFTP_CONNECTION_RETRIES,
		});
	} catch (error) {
		/**
		 * ! - Currently the CRON schedule is hourly, but if in the future it becomes more frequently,
		 * ! - we need to modify this expression programmatically and use some back-off mechanism
		 */

		logger.error(`Failed to connect to SFTP server with an error: ${error}`);

		return;
	}

	logger.info('Successfully connected to SFTP server');

	const pixelDataFileDestination = path.join('/tmp', 'atdata-data.txt');

	try {
		await sftpClient.fastGet(process.env.DATA_FILE_PATH, pixelDataFileDestination);
	} catch (error: unknown) {
		logger.error(`Failed to download pixel data with an error: ${error}`);

		return;
	}

	logger.info('Successfully downloaded pixel data file');

	const sqsClient = new SQSClient({ region: process.env.AWS_REGION, maxAttempts: SQS_MAX_ATTEMPTS });

	csvParser({ delimiter: 'auto' }, { objectMode: true })
		.fromFile(pixelDataFileDestination)
		.on('data', async (pixelDataUnit) => {
			logger.info('Trying to process pixel data unit', { pixelDataUnit });

			const validatedLineObject = await PixelUnitSchema.safeParseAsync(pixelDataUnit);

			if (!validatedLineObject.success) {
				const validationError = fromZodError(validatedLineObject.error).toString();

				logger.warn(`Failed to process pixel unit with an error: ${validationError}`, { pixelDataUnit });

				return;
			}

			const sqsMessageBodyObject: PixelCollectionData = { ...validatedLineObject.data, apiIndex: 0 };

			const sendMessageSqsCommand = new SendMessageCommand({
				QueueUrl: process.env.SQS_URL,
				MessageBody: JSON.stringify(sqsMessageBodyObject),
				MessageGroupId: `${validatedLineObject.data.email}#${validatedLineObject.data.originDomain}`,
			});

			let sendMessageSqsOutput: SendMessageCommandOutput;

			try {
				sendMessageSqsOutput = await sqsClient.send(sendMessageSqsCommand);
			} catch (error: unknown) {
				logger.warn(`Failed to send SQS message with an error: ${error}`, { pixelDataUnit });

				return;
			}

			logger.info('Successfully sent message to SQS to be handled', {
				pixelDataUnit,
				messageId: sendMessageSqsOutput.MessageId,
				awsRequestId: sendMessageSqsOutput.$metadata.requestId,
			});
		})
		.on('error', (error) => {
			logger.error(`Failed to process pixel data with an error event: ${error}`);
		})
		.on('done', () => {
			logger.info('Finished processing pixel data');
		});
};
