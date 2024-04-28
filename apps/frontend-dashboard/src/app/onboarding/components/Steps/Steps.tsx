/* eslint-disable no-warning-comments */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/lib/routes';
import type { CurrentOnboardingStepResponse } from '@/lib/types/api/onboarding';
import useBackend from '@/lib/hooks/useBackend';
import useBackendService from '@/lib/hooks/useBackendService';
import { onGetNextOnboardingStep, onGetPrevOnboardingStep } from '@/lib/utils/onboarding-steps';

import StepsView from './Steps.view';

const Steps = () => {
	const router = useRouter();
	const { data: getCurrentStepResponse, mutate: getCurrentStepMuted } = useBackend<CurrentOnboardingStepResponse>('/onboarding/current-step');

	const backendService = useBackendService();

	const [trackingScript, setTrackingScript] = useState('');

	const onNextStep = async () => {
		await getCurrentStepMuted(
			async (currentValue) => {
				await backendService.patch('/onboarding/current-step');

				if (!currentValue) {
					return { currentStep: 'welcome' };
				}

				return { currentStep: onGetNextOnboardingStep(currentValue.currentStep) };
			},
			{
				//TODO: Change revalidate to true when the backend is ready
				rollbackOnError: true,
				revalidate: false,
			},
		);
	};

	const onPrevStep = async () => {
		const prevStep = onGetPrevOnboardingStep(getCurrentStepResponse?.currentStep || 'welcome');

		await getCurrentStepMuted(() => ({ currentStep: prevStep }), {
			revalidate: false,
		});
	};

	const onSetTrackingScript = (trackingScript: string) => setTrackingScript(trackingScript);

	if (!getCurrentStepResponse?.currentStep) return null;

	if (getCurrentStepResponse.currentStep === 'done') router.push(routes.dashboard.path);

	return (
		<StepsView
			getCurrentStepResponse={getCurrentStepResponse}
			trackingScript={trackingScript}
			onNextStep={onNextStep}
			onPrevStep={onPrevStep}
			onSetTrackingScript={onSetTrackingScript}
		/>
	);
};

export default React.memo(Steps);
