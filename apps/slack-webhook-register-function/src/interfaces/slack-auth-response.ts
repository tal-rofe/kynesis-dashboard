export type SlackAuthResponse =
	| {
			readonly ok: true;
			readonly incoming_webhook: {
				readonly channel: string;
				readonly url: string;
				readonly [key: string]: unknown;
			};
			readonly [key: string]: unknown;
	  }
	| {
			readonly ok: false;
			readonly error: string;
	  };
