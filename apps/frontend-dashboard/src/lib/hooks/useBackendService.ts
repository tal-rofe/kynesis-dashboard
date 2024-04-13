import { useCallback } from 'react';
import { useSession } from 'next-auth/react';

import type { ExtendedSession } from '@/types/api/auth';
import type { THttpMethod } from '@/types/api/http';

const useBackendService = () => {
	const { data: sessionData } = useSession() as { data: ExtendedSession | null };

	const baseFetcher = async <R = unknown, D = unknown>(path: string, method: THttpMethod, data?: D): Promise<R> => {
		const res = await fetch(`/api${path}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'Encrypted-User-ID': sessionData?.userIdEncryptionHeader ?? '',
			},
			body: data ? JSON.stringify(data) : undefined,
		});

		if (!res.ok) throw new Error();

		const resData = await res.json().catch(() => undefined);

		return typeof resData === 'object' ? resData : (JSON.stringify(resData) as R);
	};

	const fetcher = {
		get: useCallback(<R = unknown>(path: string): Promise<R> => {
			return baseFetcher<R, null>(path, 'GET');
		}, []),

		post: useCallback(<R = unknown, D = unknown>(path: string, data?: D): Promise<R> => {
			return baseFetcher<R, D>(path, 'POST', data);
		}, []),

		patch: useCallback(<R = unknown, D = unknown>(path: string, data?: D): Promise<R> => {
			return baseFetcher<R, D>(path, 'PATCH', data);
		}, []),

		delete: useCallback(<R = unknown>(path: string): Promise<R> => {
			return baseFetcher<R, null>(path, 'DELETE');
		}, []),
	};

	return fetcher;
};

export default useBackendService;
