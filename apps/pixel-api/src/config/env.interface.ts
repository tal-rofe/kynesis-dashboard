export type Environment = {
	readonly nodeEnv: 'development' | 'production';
	readonly port: string;
	readonly frontendUrl: string;
};
