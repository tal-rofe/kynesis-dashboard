declare global {
	const __PACKAGE_VERSION__: string;

	namespace NodeJS {
		interface ProcessEnv {
			readonly NODE_ENV: 'development' | 'production';
			readonly PORT: string;
			readonly FRONTEND_URL: string;
		}
	}
}

export {};
