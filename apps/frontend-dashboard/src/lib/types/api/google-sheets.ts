export type GoogleSheetsCreateRequest = {
	readonly spreadSheetTitle: string;
	readonly accessEmail: string;
};

export type GoogleSheetsCreateResponse = {
	readonly spreadsheetId: string | null;
};

export type GoogleSheetsUpdateRequest = {
	readonly range: string;
	readonly values: (string | number)[][];
};

export type SpreadsheetParams = {
	readonly spreadsheetId: string;
};
