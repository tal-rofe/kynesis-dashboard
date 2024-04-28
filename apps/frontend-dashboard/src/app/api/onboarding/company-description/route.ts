import { type NextRequest, NextResponse } from 'next/server';

import { validateMiddleware } from '@/lib/middleware/validate-middleware';
import { companyDescriptionSchema } from '@/lib/schemas/company-description';
import { handleApiError } from '@/lib/utils/http-error';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
	try {
		await validateMiddleware(companyDescriptionSchema)(req);

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

		const data = {
			company: 'Microsoft',
			companyDescription:
				'Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
			productOrService: 'Software',
		};

		return NextResponse.json({ ok: res.ok, data }, { status: 200 });
	} catch (error) {
		return handleApiError(error);
	}
};
