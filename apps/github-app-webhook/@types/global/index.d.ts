declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly WEBHOOK_SECRET: string;
			readonly PORT: string;
		}
	}
}

export {};
