import type { OnboardingSteps } from '../types/api/onboarding';

export const onGetNextOnboardingStep = (currentStep: OnboardingSteps) => {
	switch (currentStep) {
		case 'welcome': {
			return 'trackingScript';
		}
		case 'trackingScript': {
			return 'htmlScript';
		}

		case 'htmlScript': {
			return 'companyDescription';
		}
		case 'companyDescription': {
			return 'slackIntegration';
		}
		default: {
			return 'done';
		}
	}
};

export const onGetPrevOnboardingStep = (currentStep: OnboardingSteps) => {
	switch (currentStep) {
		case 'companyDescription': {
			return 'htmlScript';
		}
		case 'htmlScript': {
			return 'trackingScript';
		}

		case 'trackingScript': {
			return 'welcome';
		}
		case 'slackIntegration': {
			return 'companyDescription';
		}
		default: {
			return 'welcome';
		}
	}
};
