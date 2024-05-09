declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly GOOGLE_SERVICE_CLIENT_EMAIL: string;
			readonly GOOGLE_SERVICE_PRIVATE_KEY: string;
			readonly DYNAMODB_TABLE_NAME: string;
			readonly AWS_REGION: string;
			readonly SPREADSHEET_ID: string;
		}
	}
}

export {};
