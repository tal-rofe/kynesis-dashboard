import { NextResponse } from 'next/server';

import { handleApiError } from '@/lib/utils/http-error';

export const POST = async (): Promise<NextResponse> => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
			method: 'GET',
		});

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		const data = await res.json();

		return NextResponse.json({ ok: res.ok, data }, { status: 200 });
	} catch (error) {
		return handleApiError(error);
	}
};
