export type CompanyPostTypes = 'research' | 'relatedLeads';

export type CompanyInfo = {
	readonly name: string;
	readonly websiteUrl?: string;
	readonly linkedinUrl?: string;
	readonly logoUrl?: string;
	readonly industry?: string;
	readonly numberOfEmployees?: number;
};
