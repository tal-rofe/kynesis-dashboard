import winston from 'winston';

import type ErrorCode from '@kynesis/error-codes';

type ErrorfulMetadata = Record<string, unknown> & { readonly errorCode: ErrorCode };

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

	public info(message: string, metadata: Record<string, unknown> = {}, extend = false) {
		this.logger.info(message, metadata);

		if (extend) {
			this.logger = this.logger.child(metadata);
		}
	}

	public warn(message: string, metadata: ErrorfulMetadata, extend = false) {
		this.logger.warn(message, metadata);

		if (extend) {
			this.logger = this.logger.child(metadata);
		}
	}

	public error(message: string, metadata: ErrorfulMetadata, extend = false) {
		this.logger.error(message, metadata);

		if (extend) {
			this.logger = this.logger.child(metadata);
		}
	}
}

export default LoggerService;
