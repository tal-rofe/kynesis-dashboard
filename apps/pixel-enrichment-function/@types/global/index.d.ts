declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly AWS_REGION: string;
			readonly SQS_URL: string;
			readonly PROXYCURL_API_KEY: string;
			readonly RAMPEDUP_API_KEY: string;
			readonly VETRIC_API_KEY: string;
			readonly DYNAMODB_TABLE_NAME: string;
		}
	}
}

export {};
