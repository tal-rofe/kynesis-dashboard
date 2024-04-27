import { useCallback } from 'react';
import { useSession } from 'next-auth/react';

import type { ExtendedSession } from '@/types/api/auth';
import type { THttpMethod } from '@/types/api/http';

// Extend FetchOptions to include 'data' alongside all standard fetch init options.
type FetchOptions<D> = RequestInit & {
	data?: D;
};

const useBackendService = () => {
	const { data: sessionData } = useSession() as { data: ExtendedSession | null };

	const baseFetcher = async <R = unknown, D = unknown>(path: string, method: THttpMethod, options?: FetchOptions<D>): Promise<R> => {
		const { data, ...fetchOptions } = options ?? {};

		const res = await fetch(`${path}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'Encrypted-User-ID': sessionData?.userIdEncryptionHeader ?? '',
				...fetchOptions.headers,
			},
			body: data ? JSON.stringify(data) : undefined,
			...fetchOptions,
		});

		if (!res.ok) {
			const error = new Error(`HTTP error! status: ${res.status}`);

			throw error;
		}

		return res.json().catch(() => {
			throw new Error('Failed to parse JSON response');
		});
	};

	const BackendService = {
		get: useCallback(<R = unknown>(path: string, options?: FetchOptions<null>): Promise<R> => {
			return baseFetcher<R, null>(path, 'GET', options);
		}, []),

		post: useCallback(<R = unknown, D = unknown>(path: string, options?: FetchOptions<D>): Promise<R> => {
			return baseFetcher<R, D>(path, 'POST', options);
		}, []),

		patch: useCallback(<R = unknown, D = unknown>(path: string, options?: FetchOptions<D>): Promise<R> => {
			return baseFetcher<R, D>(path, 'PATCH', options);
		}, []),

		delete: useCallback(<R = unknown>(path: string, options?: FetchOptions<null>): Promise<R> => {
			return baseFetcher<R, null>(path, 'DELETE', options);
		}, []),
	};

	return BackendService;
};

export default useBackendService;
