declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly GOOGLE_SERVICE_CLIENT_EMAIL: string;
			readonly GOOGLE_SERVICE_PRIVATE_KEY: string;
			readonly SPREADSHEET_ID: string;
		}
	}
}

export {};
