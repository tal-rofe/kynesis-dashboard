import { NextResponse } from 'next/server';

import { handleApiError } from '@/lib/utils/http-error';

export const GET = async (): Promise<NextResponse> => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
			method: 'GET',
		});

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return NextResponse.json({ ok: res.ok }, { status: 200 });
	} catch (error) {
		return handleApiError(error);
	}
};
