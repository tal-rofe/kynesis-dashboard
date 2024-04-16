import type { Environment } from './env.interface';

const EnvConfiguration = (): Environment => ({
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	proxyServerUrl: process.env.PROXY_SERVER_URL,
});

export default EnvConfiguration;
