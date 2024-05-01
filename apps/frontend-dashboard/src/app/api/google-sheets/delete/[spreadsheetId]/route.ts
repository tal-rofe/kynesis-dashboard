/* eslint-disable @typescript-eslint/no-explicit-any */
// Import necessary utilities and types
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

import { getGoogleAuth } from '@/lib/utils/google-auth';
import type { SpreadsheetParams } from '@/lib/types/api/google-sheets';

/**
 * Handles DELETE request to remove a Google Spreadsheet.
 * This function extracts the spreadsheet ID from the URL parameters.
 * @param {{ params: SpreadsheetParams }} context - An object containing the destructured URL parameters.
 * @returns {Promise<NextResponse>} A promise that resolves with the response indicating the success or failure of the operation.
 */
export const DELETE = async (_: unknown, { params }: { params: SpreadsheetParams }): Promise<NextResponse> => {
	const { spreadsheetId } = params;

	if (!spreadsheetId) {
		return NextResponse.json(
			{
				ok: false,
				message: 'Spreadsheet ID is required.',
			},
			{ status: 400 },
		);
	}

	const auth = getGoogleAuth();
	const driveService = google.drive({ version: 'v3', auth });

	try {
		await driveService.files.delete({
			fileId: spreadsheetId,
		});

		return NextResponse.json(
			{
				ok: true,
				message: 'Spreadsheet deleted successfully.',
			},
			{ status: 200 },
		);
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
