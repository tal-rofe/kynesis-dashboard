'use client';

import React, { useState } from 'react';

import { type OnboardingSteps } from '@/lib/types/api/onboarding';
import StepsView from './Steps.view';

const Steps = () => {
	const [currentStep, setCurrentStep] = useState<OnboardingSteps>('welcome');

	const onNextStep = () => {
		switch (currentStep) {
			case 'welcome': {
				setCurrentStep('company');

				break;
			}
			case 'company': {
				setCurrentStep('trackingScript');

				break;
			}

			case 'trackingScript': {
				setCurrentStep('htmlScript');

				break;
			}
		}
	};

	const onPrevStep = () => {
		switch (currentStep) {
			case 'company': {
				setCurrentStep('welcome');

				break;
			}
			case 'trackingScript': {
				setCurrentStep('company');

				break;
			}

			case 'htmlScript': {
				setCurrentStep('trackingScript');

				break;
			}
		}
	};

	return <StepsView currentStep={currentStep} onNextStep={onNextStep} onPrevStep={onPrevStep} />;
};

export default React.memo(Steps);
