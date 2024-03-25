class LoggerService {
	private requestId: string;

	constructor(requestId: string) {
		this.requestId = requestId;
	}

	public log(message: string) {
		console.log(`[Request ID: ${this.requestId}] ${message}`);
	}
}

export default LoggerService;
