import got, { type Headers } from 'got';
import { proxyAgents } from 'src/data/proxy-agents';

const SECOND = 1000;

const TIMEOUT = 10 * SECOND;

const RETRIES = 3;

export const getBaseHttp = (proxyIndex: number, headers?: Headers, authorized?: boolean) => {
	const newHeaders = { ...headers };

	if (authorized) {
		newHeaders['Authorization'] = `Bearer ${proxyAgents[proxyIndex]!.token}`;
	}

	return got.extend({
		timeout: { request: TIMEOUT },
		retry: {
			limit: RETRIES,
			methods: ['HEAD', 'OPTIONS', 'TRACE', 'GET'],
			statusCodes: [408, 413, 500, 502, 503, 504, 521, 522, 524],
			// * Keep others (backoff limit, ...) as default
		},
		throwHttpErrors: false,
		agent: { https: proxyAgents[proxyIndex]!.agent },
		headers: newHeaders,
	});
};
