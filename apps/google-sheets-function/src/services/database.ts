import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const fetchVisitorsFromDatabase = async () => {
	const visitors = await prismaClient.visitor.findMany({
		where: {
			VisitorDomain: { some: { domain: process.env.GOOGLE_SHEETS_CUSTOMER_DOMAIN } },
		},
		select: {
			email: true,
			linkedinUrl: true,
			firstName: true,
			lastName: true,
			title: true,
			location: true,
			companyName: true,
			companySize: true,
			companyIndustry: true,
			companyWebsite: true,
			companyDescription: true,
			companyLocation: true,
			githubUsername: true,
		},
	});

	const validCsvVisitors = visitors.map((visitor) => ({
		email: visitor.email ?? '',
		linkedinUrl: visitor.linkedinUrl ?? '',
		firstName: visitor.firstName ?? '',
		lastName: visitor.lastName ?? '',
		title: visitor.title ?? '',
		location: visitor.location ?? '',
		companyName: visitor.companyName ?? '',
		companySize: visitor.companySize ?? '',
		companyIndustry: visitor.companyIndustry ?? '',
		companyWebsite: visitor.companyWebsite ?? '',
		companyDescription: visitor.companyDescription ?? '',
		companyLocation: visitor.companyLocation ?? '',
		githubUsername: visitor.githubUsername ?? '',
	}));

	return validCsvVisitors;
};
