import { google } from 'googleapis';
import type { ScheduledHandler } from 'aws-lambda';

import LoggerService from '@kynesis/lambda-logger';
import ErrorCode from '@kynesis/error-codes';

import { getGoogleAuth } from './utils/google-auth';
import { fetchVisitorsFromDB } from './utils/dynamodb';

const googleSheetsClient = google.sheets({ version: 'v4', auth: getGoogleAuth() });

export const handler: ScheduledHandler = async (_, context) => {
	const logger = new LoggerService(context.awsRequestId);

	logger.info('Start processing update spreadsheet event');

	const visitors = await fetchVisitorsFromDB();

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
