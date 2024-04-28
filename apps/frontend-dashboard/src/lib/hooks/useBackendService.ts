import { useCallback } from 'react';
import { useSession } from 'next-auth/react';

import type { ExtendedSession } from '@/types/api/auth';
import type { THttpMethod, ResponseData, FetchOptions } from '@/types/api/http';

const useBackendService = () => {
	const { data: sessionData } = useSession() as { data: ExtendedSession | null };

	const fetcher = useCallback(
		async <R = unknown, D = unknown>(path: string, method: THttpMethod, options?: FetchOptions<D>): Promise<ResponseData<R>> => {
			const { data, ...fetchOptions } = options ?? {};

			const headers = {
				'Content-Type': 'application/json',
				'Encrypted-User-ID': sessionData?.userIdEncryptionHeader ?? '-1',
				...fetchOptions.headers,
			};

			const response = await fetch(`api${path}`, {
				method,
				headers,
				body: data ? JSON.stringify(data) : undefined,
				...fetchOptions,
			});

			if (!response.ok) {
				const errorResponse = await response.json().catch(() => ({
					message: `Failed to fetch: ${response.status} ${response.statusText}`,
					status: response.status,
				}));

				return errorResponse as ResponseData<R>;
			}

			return response.json().catch(() => ({
				ok: false,
				status: response.status,
			}));
		},
		[sessionData],
	);

	const BackendService = {
		get: useCallback(
			<R = unknown>(path: string, options?: FetchOptions<null>): Promise<ResponseData<R>> => {
				return fetcher<R, null>(path, 'GET', options);
			},
			[sessionData],
		),

		post: useCallback(
			<R = unknown, D = unknown>(path: string, options?: FetchOptions<D>): Promise<ResponseData<R>> => {
				return fetcher<R, D>(path, 'POST', options);
			},
			[sessionData],
		),

		patch: useCallback(
			<R = unknown, D = unknown>(path: string, options?: FetchOptions<D>): Promise<ResponseData<R>> => {
				return fetcher<R, D>(path, 'PATCH', options);
			},
			[sessionData],
		),

		delete: useCallback(
			<R = unknown>(path: string, options?: FetchOptions<null>): Promise<ResponseData<R>> => {
				return fetcher<R, null>(path, 'DELETE', options);
			},
			[sessionData],
		),
	};

	return BackendService;
};

export default useBackendService;
