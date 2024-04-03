import got from 'got';

import { API_CALL_RETRIES, API_CALL_TIMEOUT } from '../constants/http-api';

type VetricResponse = Record<string, unknown> & { cursor?: string | null };

export const vetricHttpGet = async (url: string, linkedinUrl: string, apiKey: string) => {
	const linkedinIdentifier = new URL(linkedinUrl)?.pathname?.split('/')?.[2];

	if (!linkedinIdentifier) {
		throw new Error('Missing Linkedin identifier');
	}

	const apiUrlWithIdentifier = url.replace(':identifier', linkedinIdentifier);

	const response = await got
		.get(apiUrlWithIdentifier, {
			headers: { 'x-api-key': apiKey },
			timeout: { request: API_CALL_TIMEOUT },
			retry: {
				limit: API_CALL_RETRIES,
				methods: ['HEAD', 'OPTIONS', 'TRACE', 'GET'],
				// * Keep others (backoff limit, ...) as default
			},
		})
		.json<VetricResponse>();

	// * Irrelevant data for customer
	delete response.cursor;

	return response;
};
