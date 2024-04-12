import React from 'react';

import { type OnboardingSteps } from '@/lib/types/api/onboarding';

import Welcome from './Welcome';
import TrackingScript from './TrackingScript';
import HtmlScript from './HtmlScript';
import Company from './Company';

type Props = {
	readonly currentStep: OnboardingSteps;
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
};

const StepsView = (props: Props) => {
	return (
		<>
			{props.currentStep === 'welcome' && <Welcome onNextStep={props.onNextStep} />}
			{props.currentStep === 'trackingScript' && <TrackingScript onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} />}
			{props.currentStep === 'htmlScript' && <HtmlScript onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} />}
			{props.currentStep === 'company' && <Company onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} />}
		</>
	);
};

export default React.memo(StepsView);
