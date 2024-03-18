import type { Environment } from './env.interface';

const EnvConfiguration = (): Environment => ({
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	frontendUrl: process.env.FRONTEND_URL,
});

export default EnvConfiguration;
