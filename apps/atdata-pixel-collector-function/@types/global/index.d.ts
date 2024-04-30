declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly ATDATA_PIXEL_ID: string;
			readonly AWS_REGION: string;
			readonly SQS_URL: string;
			readonly ATDATA_SFTP_HOST: string;
			readonly ATDATA_SFTP_PORT: string;
			readonly ATDATA_SFTP_USERNAME: string;
			readonly ATDATA_SFTP_PASSWORD: string;
		}
	}
}

export {};
