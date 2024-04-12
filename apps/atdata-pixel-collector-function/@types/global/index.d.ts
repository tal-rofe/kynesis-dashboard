declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly AWS_REGION: string;
			readonly SQS_URL: string;
			readonly ATDATA_SFTP_HOST: string;
			readonly ATDATA_SFTP_PORT: string;
			readonly ATDATA_SFTP_USERNAME: string;
			readonly ATDATA_SFTP_PASSWORD: string;
			readonly DATA_FILE_PATH: string;
		}
	}
}

export {};
