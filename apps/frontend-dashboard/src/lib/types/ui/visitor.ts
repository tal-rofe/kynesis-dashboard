import { type CompanyInfo } from './company';

export type Visitor = {
	readonly id: string;
	readonly fullName: string;
	readonly title: string;
	readonly email: string;
	readonly lastVisit: Date;
	readonly visitorLinkedinUrl: string;
	readonly allTimeVisitsCount?: number;
	readonly companyInfo: CompanyInfo;
};
