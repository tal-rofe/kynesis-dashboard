import React from 'react';
import { type OnboardingSteps } from '@/lib/types/api/onboarding';
import Welcome from './Welcome';
import Company from './Company';
import TrackingScript from './TrackingScript';
import HtmlScript from './HtmlScript';

type Props = {
	readonly currentStep: OnboardingSteps;
	readonly onNextStep: () => void;
	readonly onPrevStep: () => void;
};

const StepsView = (props: Props) => {
	return (
		<>
			{props.currentStep === 'welcome' && <Welcome onNextStep={props.onNextStep} />}
			{props.currentStep === 'company' && <Company onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} />}
			{props.currentStep === 'trackingScript' && <TrackingScript onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} />}
			{props.currentStep === 'htmlScript' && <HtmlScript onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} />}
		</>
	);
};

export default React.memo(StepsView);
