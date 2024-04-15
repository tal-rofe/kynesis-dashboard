declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly AWS_REGION: string;
			readonly SQS_URL: string;
			readonly BIGBDM_CLIENT_ID: string;
			readonly BIGBDM_CLIENT_SECRET: string;
		}
	}
}

export {};
