declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly AWS_REGION: string;
			readonly SQS_URL: string;
		}
	}
}

export {};
