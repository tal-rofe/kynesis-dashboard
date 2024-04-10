export type WelcomeFormInputs = {
	readonly firstName: string;
	readonly lastName: string;
	readonly companyLinkedInURL: string;
};

export type OnboardingSteps = 'welcome' | 'trackingScript' | 'htmlScript' | 'company';

export type ScriptDomainType = 'everySubDomain' | 'specificSubDomain';
