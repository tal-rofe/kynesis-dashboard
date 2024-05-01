/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis';
import { type NextRequest, NextResponse } from 'next/server';

import { getGoogleAuth } from '@/lib/utils/google-auth';
import type { GoogleSheetsUpdateRequest, SpreadsheetParams } from '@/lib/types/api/google-sheets';

/**
 * Handles POST request to update cells in a Google Spreadsheet.
 * This function extracts the spreadsheet ID from the URL parameters and uses it to update specific cells.
 * It is designed to be used as an API route in Next.js.
 * @param {NextRequest} request - The incoming request object provided by Next.js.
 * @param {{ params: SpreadsheetParams }} context - An object containing the destructured URL parameters.
 *        `params` must include `spreadsheetId` which is used to identify the spreadsheet.
 *
 * @returns {Promise<NextResponse>} A promise that resolves with no value, indicating that the response has been sent.
 *                          The function sends a JSON response with either a success message and data or an error message.
 */
export const POST = async (request: NextRequest, { params }: { params: SpreadsheetParams }): Promise<NextResponse> => {
	const { spreadsheetId } = params;
	const { range, values }: GoogleSheetsUpdateRequest = await request.json();

	if (!spreadsheetId || typeof spreadsheetId !== 'string') {
		throw new Error('Spreadsheet ID must be provided in the URL.');
	}

	if (!range || !values) {
		throw new Error('Range and values must be provided in the request body.');
	}

	const auth = getGoogleAuth();

	const sheetsService = google.sheets({ version: 'v4', auth });

	try {
		const response = await sheetsService.spreadsheets.values.update({
			spreadsheetId,
			range,
			valueInputOption: 'USER_ENTERED',
			requestBody: { values },
		});

		return NextResponse.json({
			ok: true,
			data: {
				updatedRange: response.data.updatedRange,
				updatedRows: response.data.updatedRows,
			},
			message: 'Cells updated successfully.',
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				ok: false,
				error: error.message,
			},
			{ status: 500 },
		);
	}
};
