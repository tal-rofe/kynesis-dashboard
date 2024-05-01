/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis';
import { type NextRequest, NextResponse } from 'next/server';

import { getGoogleAuth } from '@/lib/utils/google-auth';
import type { GoogleSheetsCreateRequest, GoogleSheetsCreateResponse } from '@/lib/types/api/google-sheets';

/**
 * Creates a Google Spreadsheet and shares it with a given email.
 * @param {GoogleSheetsCreateRequest} req - The request object containing the spreadsheet title and email to share with.
 * @return {Promise<object>} - A response object with success status and data or error message.
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
	const { spreadSheetTitle, accessEmail }: GoogleSheetsCreateRequest = await req.json();

	const auth = getGoogleAuth();

	const sheetsService = google.sheets({ version: 'v4', auth });
	const driveService = google.drive({ version: 'v3', auth });

	try {
		// * Create the spreadsheet
		const spreadsheet = await sheetsService.spreadsheets.create({
			requestBody: {
				properties: {
					title: spreadSheetTitle,
				},
			},
			// * Define the fields to return
			fields: 'spreadsheetId',
		});

		const spreadsheetId = spreadsheet.data.spreadsheetId;

		if (!spreadsheetId) {
			throw new Error('Failed to create spreadsheet.');
		}

		// * Set permissions on the created spreadsheet
		await driveService.permissions.create({
			fileId: spreadsheetId,
			requestBody: {
				role: 'writer', // Can be 'reader', 'writer', or 'owner'
				type: 'user',
				emailAddress: accessEmail,
			},
		});

		const responseData: GoogleSheetsCreateResponse = {
			spreadsheetId: spreadsheetId,
		};

		return NextResponse.json(
			{
				ok: true,
				data: responseData,
				message: 'Spreadsheet created successfully.',
			},
			{ status: 200 },
		);
	} catch (error: any) {
		const responseData: GoogleSheetsCreateResponse = {
			spreadsheetId: null,
		};

		return NextResponse.json(
			{
				ok: false,
				data: responseData,
				error: error.message,
			},
			{ status: 500 },
		);
	}
};
