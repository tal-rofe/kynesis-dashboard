'use client';

import React, { useState } from 'react';

import { type OnboardingSteps } from '@/lib/types/api/onboarding';
import StepsView from './Steps.view';

const Steps = () => {
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
