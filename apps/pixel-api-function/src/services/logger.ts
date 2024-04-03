class LoggerService {
	private requestId: string;

	constructor(requestId: string) {
		this.requestId = requestId;
	}

	public info(message: string, metadata: Record<string, unknown> = {}) {
		console.log(`[Request ID: ${this.requestId}] [INFO] ${message} [Metadata: ${JSON.stringify(metadata)}]`);
	}

	public error(message: string, metadata: Record<string, unknown> = {}) {
		console.log(`[Request ID: ${this.requestId}] [ERROR] ${message} [Metadata: ${JSON.stringify(metadata)}]`);
	}
}

export default LoggerService;
