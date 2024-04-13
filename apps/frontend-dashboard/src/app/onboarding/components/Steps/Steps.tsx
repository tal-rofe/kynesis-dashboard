'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

import { routes } from '@/lib/routes';
import { type OnboardingSteps } from '@/lib/types/api/onboarding';

import StepsView from './Steps.view';

const Steps = () => {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState<OnboardingSteps>('welcome');

	const onNextStep = () => {
		switch (currentStep) {
			case 'welcome': {
				setCurrentStep('trackingScript');

				break;
			}
			case 'trackingScript': {
				setCurrentStep('htmlScript');

				break;
			}

			case 'htmlScript': {
				setCurrentStep('company');

				break;
			}
			case 'company': {
				const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzc2MjI5NzF9.12U8rz6PNlrAc8rSTjUJ_mT_Q5stm5LlVOnqbHd1ZLI';
				// const inValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQ1NTExMTh9.ekxYUsr2_lx-LZB541KjUGHi8Sz2xOxVu3PpxVK9do8';

				setCookie('token', validToken);

				router.push(routes.visitors.path);

				break;
			}
		}
	};

	const onPrevStep = () => {
		switch (currentStep) {
			case 'company': {
				setCurrentStep('htmlScript');

				break;
			}
			case 'htmlScript': {
				setCurrentStep('trackingScript');

				break;
			}

			case 'trackingScript': {
				setCurrentStep('welcome');

				break;
			}
		}
	};

	return <StepsView currentStep={currentStep} onNextStep={onNextStep} onPrevStep={onPrevStep} />;
};

export default React.memo(Steps);
