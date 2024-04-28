import got from 'got';

import { API_CALL_RETRIES, API_CALL_TIMEOUT } from '@/constants/http-api';

export const linkedinUrlHttpGet = (url: string, params: URLSearchParams | null, apiKey: string) =>
	got
		.get(url, {
			searchParams: params ?? undefined,
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
			timeout: { request: API_CALL_TIMEOUT },
			retry: {
				limit: API_CALL_RETRIES,
				methods: ['HEAD', 'OPTIONS', 'TRACE', 'GET'],
				// * Keep others (backoff limit, ...) as default
			},
		})
		.json();

export const linkedinUrlHttpPost = (url: string, data: Record<string, unknown>, apiKey: string) =>
	got
		.post(url, {
			json: data,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`,
			},
			timeout: { request: API_CALL_TIMEOUT },
			retry: {
				limit: API_CALL_RETRIES,
				methods: ['HEAD', 'OPTIONS', 'TRACE', 'GET'],
				// * Keep others (backoff limit, ...) as default
			},
		})
		.json();
