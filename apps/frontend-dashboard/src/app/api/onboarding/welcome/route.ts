import { type NextRequest, NextResponse } from 'next/server';

import { welcomeFormInputsSchema } from '@/lib/schemas/welcome-form-inputs';
import { validateMiddleware } from '@/lib/middleware/validate-middleware';
import { handleApiError } from '@/lib/utils/http-error';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		await validateMiddleware(welcomeFormInputsSchema)(req);

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

export const GET = async (): Promise<NextResponse> => {
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
