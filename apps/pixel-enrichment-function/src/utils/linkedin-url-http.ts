import got from 'got';

import { API_CALL_RETRIES, API_CALL_TIMEOUT } from '../constants/http-api';

export const httpGet = <TResponse extends Record<string, unknown>>(url: string, params: URLSearchParams, apiKey: string) =>
	got
		.get(url, {
			searchParams: params,
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
			timeout: { request: API_CALL_TIMEOUT },
			retry: {
				limit: API_CALL_RETRIES,
				methods: ['HEAD', 'OPTIONS', 'TRACE', 'GET'],
				// Keep others (backoff limit, ...) as default
			},
		})
		.json<TResponse>();

export const httpPost = <TResponse extends Record<string, unknown>>(url: string, data: Record<string, unknown>, apiKey: string) =>
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
				// Keep others (backoff limit, ...) as default
			},
		})
		.json<TResponse>();
