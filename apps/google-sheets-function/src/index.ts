import { google } from 'googleapis';
import type { ScheduledHandler } from 'aws-lambda';

import LoggerService from '@kynesis/lambda-logger';
import ErrorCode from '@kynesis/error-codes';

import { getGoogleAuth } from './helpers/google-auth';
import { fetchVisitorsFromDatabase } from './services/database';

const googleSheetsClient = google.sheets({ version: 'v4', auth: getGoogleAuth() });

export const handler: ScheduledHandler = async (_, context) => {
	const logger = new LoggerService(context.awsRequestId);

	logger.info('Start processing EventBridge event');

	let visitors: Awaited<ReturnType<typeof fetchVisitorsFromDatabase>>;

	try {
		visitors = await fetchVisitorsFromDatabase();
	} catch (error) {
		logger.error('Failed to fetch visitors from database', { errorCode: ErrorCode.FIND_MANY_DB, error });

		return;
	}

	for (const visitor of visitors) {
		try {
			await googleSheetsClient.spreadsheets.values.update({
				spreadsheetId: process.env.SPREADSHEET_ID,
				range: visitor.range,
				valueInputOption: 'USER_ENTERED',
				requestBody: {
					values: visitor.values,
				},
			});

			logger.info(`Updated range ${visitor.range} successfully.`);
		} catch (error) {
			logger.error(`Failed to update range ${visitor.range}`, { errorCode: ErrorCode.UPDATE_SPREADSHEET });
		}
	}
};
