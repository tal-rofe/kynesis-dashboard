import React from 'react';

import type { CurrentOnboardingStepResponse } from '@/lib/types/api/onboarding';

import Welcome from './Welcome';
import TrackingScript from './TrackingScript';
import HtmlScript from './HtmlScript';
import CompanyDescription from './CompanyDescription';
import SlackIntegration from './SlackIntegration';

type Props = {
	readonly getCurrentStepResponse: CurrentOnboardingStepResponse;
	readonly trackingScript: string;
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
	readonly onSetTrackingScript: (trackingScript: string) => void;
};

const StepsView = (props: Props) => {
	return (
		<>
			{props.getCurrentStepResponse.currentStep === 'welcome' && <Welcome onNextStep={props.onNextStep} />}
			{props.getCurrentStepResponse.currentStep === 'trackingScript' && (
				<TrackingScript onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} onSetTrackingScript={props.onSetTrackingScript} />
			)}
			{props.getCurrentStepResponse.currentStep === 'htmlScript' && (
				<HtmlScript trackingScript={props.trackingScript} onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} />
			)}
			{props.getCurrentStepResponse.currentStep === 'companyDescription' && (
				<CompanyDescription onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} />
			)}
			{props.getCurrentStepResponse.currentStep === 'slackIntegration' && (
				<SlackIntegration onNextStep={props.onNextStep} onPrevStep={props.onPrevStep} />
			)}
		</>
	);
};

export default React.memo(StepsView);
