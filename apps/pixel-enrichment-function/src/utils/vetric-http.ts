import got from 'got';
import deepmerge from 'deepmerge';

import { API_CALL_RETRIES, API_CALL_TIMEOUT } from '../constants/http-api';

type VetricResponse = Record<string, unknown> & { cursor?: string | null };

export const vetricHttpGet = async (url: string, linkedinUrl: string, apiKey: string) => {
	const linkedinIdentifier = new URL(linkedinUrl)?.pathname?.split('/')?.[2];

	if (!linkedinIdentifier) {
		throw new Error('Missing Linkedin identifier');
	}

	const apiUrlWithIdentifier = url.replace(':identifier', linkedinIdentifier);

	let response = await got
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

	if (response['cursor'] === 'undefined' || response['cursor'] === null) {
		return response;
	}

	while (response.cursor !== 'undefined' && response.cursor !== null) {
		const newApiUrl = new URLSearchParams(apiUrlWithIdentifier);

		newApiUrl.set('cursor', response.cursor!);

		const newResponse = await got
			.get(newApiUrl.toString(), {
				headers: { 'x-api-key': apiKey },
				timeout: { request: API_CALL_TIMEOUT },
				retry: {
					limit: API_CALL_RETRIES,
					methods: ['HEAD', 'OPTIONS', 'TRACE', 'GET'],
					// * Keep others (backoff limit, ...) as default
				},
			})
			.json<VetricResponse>();

		/**
		 * * Delete it so the most updated value of "cursor" will be of "newResponse",
		 * * because maybe "cursor" is missing from "newResponse" - then we might enter infinite loop
		 */
		delete response.cursor;

		response = deepmerge(response, newResponse);
	}

	// * Irrelevant data for customer
	delete response.cursor;

	return response;
};
