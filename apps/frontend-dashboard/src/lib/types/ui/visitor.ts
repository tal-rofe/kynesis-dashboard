export type Visitor = {
	readonly id: string;
	readonly fullName: string;
	readonly company: string;
	readonly title: string;
	readonly email: string;
	readonly lastVisit: Date;
	readonly linkedinUrl: string;
	readonly companyProfileImage?: string;
};
