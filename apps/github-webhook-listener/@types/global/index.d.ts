declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly GH_APP_ID: string;
			readonly GH_APP_PRIVATE_KEY: string;
			readonly GH_APP_WEBHOOK_SECRET: string;
		}
	}
}

export {};
