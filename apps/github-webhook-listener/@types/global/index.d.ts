declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly GITHUB_APP_ID: string;
			readonly GITHUB_APP_PRIVATE_KEY: string;
			readonly GITHUB_APP_WEBHOOK_TOKEN: string;
		}
	}
}

export {};
