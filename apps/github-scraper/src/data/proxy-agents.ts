import { HttpsProxyAgent } from 'https-proxy-agent';

import { PROXY_INITIAL_PORT, PROXIES_COUNT } from '../constants/proxy';

import { githubApiAccessTokens } from './access-tokens';

export const proxyAgents = new Array(PROXIES_COUNT).fill(null).map((_, index) => ({
	agent: new HttpsProxyAgent(`http://127.0.0.1:${PROXY_INITIAL_PORT + index}`),
	token: githubApiAccessTokens[index % githubApiAccessTokens.length],
}));
