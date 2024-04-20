import { type CompanyInfo } from './company';

type VisitorAnalytics = {
	readonly firstVisitDate: Date;
	readonly lastVisitDate: Date;
	readonly allTimeVisitsCount?: number;
	readonly visitedPages: string[];
};

export type Visitor = {
	readonly id: string;
	readonly fullName: string;
	readonly title: string;
	readonly email: string;
	readonly state: string;
	readonly city: string;
	readonly linkedinUrl: string;
	readonly companyInfo: CompanyInfo;
	readonly analytics: VisitorAnalytics;
};
