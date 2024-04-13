import { useCallback } from 'react';

import type { THttpMethod } from '@/types/api/http';
import { encrypt } from '@/utils/encrypt';

const useBackendService = () => {
	const baseFetcher = async <R = unknown, D = unknown>(path: string, method: THttpMethod, data?: D): Promise<R> => {
		const text = 'some text';
		const key = '123';

		const encryptedUserId = await encrypt(text, key);

		const headerValue = Buffer.from(`${encryptedUserId.iv}:${encryptedUserId.encryptedData}`).toString('base64');

		const res = await fetch(`/api${path}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'Encrypted-User-ID': headerValue,
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
