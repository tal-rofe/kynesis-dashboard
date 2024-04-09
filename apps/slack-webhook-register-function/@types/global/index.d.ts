declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly AWS_REGION: string;
			readonly DYNAMODB_TABLE_NAME: string;
			readonly SLACK_CLIENT_ID: string;
			readonly SLACK_CLIENT_SECRET: string;
		}
	}
}

export {};
