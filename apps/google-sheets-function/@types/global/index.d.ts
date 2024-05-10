declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly GOOGLE_SERVICE_CLIENT_EMAIL: string;
			readonly GOOGLE_SERVICE_PRIVATE_KEY: string;
			readonly GOOGLE_SHEETS_SPREADSHEET_ID: string;
			readonly GOOGLE_SHEETS_CUSTOMER_DOMAIN: string;
		}
	}
}

export {};
