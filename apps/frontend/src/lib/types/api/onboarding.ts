export type WelcomeFormInputs = {
	readonly firstName: string;
	readonly lastName: string;
	readonly companyLinkedInURL: string;
};

export type OnboardingSteps = 'welcome' | 'company' | 'trackingScript' | 'htmlScript';

export type ScriptDomainType = 'everySubDomain' | 'specificSubDomain';
