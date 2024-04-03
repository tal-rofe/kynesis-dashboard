class LoggerService {
	private requestId: string;

	constructor(requestId: string) {
		this.requestId = requestId;
	}

	public info(message: string) {
		console.log(`[Request ID: ${this.requestId}] [INFO] ${message}`);
	}

	public warn(message: string) {
		console.log(`[Request ID: ${this.requestId}] [WARN] ${message}`);
	}

	public error(message: string) {
		console.log(`[Request ID: ${this.requestId}] [ERROR] ${message}`);
	}
}

export default LoggerService;
