export type WelcomeFormInputs = {
	readonly firstName: string;
	readonly lastName: string;
	readonly companyLinkedInURL: string;
};

export type CompanyDescriptionRequestResponse = {
	readonly company: string;
	readonly companyDescription: string;
	readonly productOrService: string;
};

export type TrackingScriptResponse = {
	readonly trackingScript: string;
};

export type CurrentOnboardingStepResponse = {
	readonly currentStep: OnboardingSteps;
};

export type OnboardingSteps = 'welcome' | 'trackingScript' | 'htmlScript' | 'companyDescription' | 'slackIntegration' | 'done';

export type ScriptDomainType = 'everySubDomain' | 'specificSubDomain';
