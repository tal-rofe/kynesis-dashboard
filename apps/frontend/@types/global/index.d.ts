declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly NEXT_PUBLIC_NODE_ENV: 'development' | 'production';
			readonly NEXT_PUBLIC_BACKEND_URL: string;
			readonly GOOGLE_CLIENT_ID: string;
			readonly GOOGLE_CLIENT_SECRET: string;
			readonly NEXTAUTH_SECRET: string;
		}
	}
}

export {};
