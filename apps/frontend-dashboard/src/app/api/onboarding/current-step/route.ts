import { NextResponse } from 'next/server';

// import { currentOnboardingStepSchema } from '@/lib/schemas/current-onboarding-step';
// import { validateMiddleware } from '@/lib/middleware/validate-middleware';
import { handleApiError } from '@/lib/utils/http-error';
import type { CurrentOnboardingStepResponse } from '@/lib/types/api/onboarding';
import { onGetNextOnboardingStep } from '@/lib/utils/onboarding-steps';

export const GET = async (): Promise<NextResponse> => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
			method: 'GET',
		});

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		const data: CurrentOnboardingStepResponse = {
			currentStep: 'welcome',
		};

		return NextResponse.json({ ok: res.ok, data }, { status: 200 });
	} catch (error) {
		return handleApiError(error);
	}
};

export const PATCH = async (): Promise<NextResponse> => {
	try {
		// await validateMiddleware(currentOnboardingStepSchema)(req);

		const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
			method: 'GET',
		});

		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		// const data = (await req.body) as CurrentOnboardingStepResponse;

		// console.log('data', data);

		const nextStep = onGetNextOnboardingStep('welcome');

		return NextResponse.json(
			{
				ok: res.ok,
				data: {
					currentStep: nextStep,
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		return handleApiError(error);
	}
};
