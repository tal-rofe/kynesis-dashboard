import { google } from 'googleapis';
import type { ScheduledHandler } from 'aws-lambda';

import LoggerService from '@kynesis/lambda-logger';
import ErrorCode from '@kynesis/error-codes';

import { getGoogleAuth } from './helpers/google-auth';
import { fetchVisitorsFromDatabase } from './services/database';
import { SPREADSHEET_MAX_BATCH_SIZE } from './constants/spreadsheet';

const googleSheetsClient = google.sheets({ version: 'v4', auth: getGoogleAuth() });

export const handler: ScheduledHandler = async (_, context) => {
	const logger = new LoggerService(context.awsRequestId);

	logger.info('Start processing EventBridge event');

	let visitors;

	try {
		visitors = await fetchVisitorsFromDatabase();
	} catch (error) {
		logger.error('Failed to fetch visitors from database', { errorCode: ErrorCode.FIND_MANY_DB, error });

		return;
	}

	try {
		await googleSheetsClient.spreadsheets.values.clear({
			spreadsheetId: process.env.SPREADSHEET_ID,
			range: 'Sheet1',
		});
		logger.info('Sheet cleared successfully.');
	} catch (error) {
		logger.error('Failed to clear the sheet', { errorCode: ErrorCode.CLEAR_SPREADSHEET, error });

		return;
	}

	while (visitors.length > 0) {
		const visitorsBatch = visitors.splice(0, SPREADSHEET_MAX_BATCH_SIZE);

		const values = visitorsBatch.map((visitor) => [
			visitor.email,
			visitor.linkedinUrl,
			visitor.firstName,
			visitor.lastName,
			visitor.title,
			visitor.location,
			visitor.companyName,
			visitor.companySize,
			visitor.companyIndustry,
			visitor.companyWebsite,
			visitor.companyDescription,
			visitor.companyLocation,
			visitor.githubUsername,
		]);

		try {
			await googleSheetsClient.spreadsheets.values.append({
				spreadsheetId: process.env.SPREADSHEET_ID,
				range: 'Sheet1',
				valueInputOption: 'USER_ENTERED',
				insertDataOption: 'INSERT_ROWS', // * Ensures that rows are inserted, not overwritten
				requestBody: { values: values },
			});

			logger.info(`Appended ${values.length} rows successfully.`);
		} catch (error) {
			logger.error('Failed to append rows', { errorCode: ErrorCode.APPEND_SPREADSHEET, error });

			return;
		}
	}
};
