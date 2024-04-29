import winston from 'winston';

class LoggerService {
	private logger: winston.Logger;

	constructor(requestId: string) {
		this.logger = winston.createLogger({
			level: 'info',
			defaultMeta: { requestId },
			format: winston.format.combine(
				winston.format.timestamp({
					format: () => Date.now().toString(),
				}),
				winston.format.json(),
			),
			transports: [new winston.transports.Console()],
		});
	}

	public info(message: string, metadata: Record<string, unknown> = {}) {
		this.logger.info(message, metadata);
	}

	public warn(message: string, metadata: Record<string, unknown> = {}) {
		this.logger.warn(message, metadata);
	}

	public error(message: string, metadata: Record<string, unknown> = {}) {
		this.logger.error(message, metadata);
	}
}

export default LoggerService;
