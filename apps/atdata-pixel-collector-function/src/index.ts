import path from 'node:path';

import type { ScheduledHandler } from 'aws-lambda';
import SftpClient from 'ssh2-sftp-client';
import LoggerService from '@kynesis/lambda-logger';
import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';
import { SQSClient, SendMessageCommand, type SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { fromZodError } from 'zod-validation-error';

import { SFTP_CONNECTION_RETRIES, SFTP_HANDSHAKE_TIMEOUT } from './constants/sftp';
import { readByLine } from './utils/read-by-line';
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

	try {
		// * Using "await" to keep the "try{}catch{}" scope
		await readByLine(pixelDataFileDestination, async (line: string) => {
			let parsedLine: unknown;

			try {
				parsedLine = JSON.parse(line);
			} catch (error) {
				logger.error(`Failed to process pixel data unit with an error: ${error}`, { line });

				return;
			}

			const validatedLineObject = await PixelUnitSchema.safeParseAsync(parsedLine);

			if (!validatedLineObject.success) {
				const validationError = fromZodError(validatedLineObject.error).toString();

				logger.error(`Failed to process pixel line with an error: ${validationError}`, { line });

				return;
			}

			const messageBodyObject: PixelCollectionData = { ...validatedLineObject.data, apiIndex: 0 };

			const sendMessageSqsCommand = new SendMessageCommand({
				QueueUrl: process.env.SQS_URL,
				MessageBody: JSON.stringify(messageBodyObject),
				MessageGroupId: `${validatedLineObject.data.email}#${validatedLineObject.data.originDomain}`,
			});

			let sendMessageSqsOutput: SendMessageCommandOutput;

			try {
				sendMessageSqsOutput = await sqsClient.send(sendMessageSqsCommand);
			} catch (error: unknown) {
				logger.error(`Failed to send SQS message with an error: ${error}`, { line });

				return;
			}

			logger.info('Successfully sent message to SQS to be handled', {
				line,
				messageId: sendMessageSqsOutput.MessageId,
				awsRequestId: sendMessageSqsOutput.$metadata.requestId,
			});
		});
	} catch (error) {
		logger.error(`Failed to process pixel data with an error: ${error}`);

		return;
	}

	logger.info('Successfully processed pixel data file');

	try {
		// * Delete the file so in the next Lambda execution we won't process the same data
		await sftpClient.delete(process.env.DATA_FILE_PATH, true);
	} catch (error: unknown) {
		logger.error(`Failed to delete pixel data file with an error: ${error}`);

		return;
	}
};
