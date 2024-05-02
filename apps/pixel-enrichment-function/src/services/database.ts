import { PrismaClient, type Visitor } from '@prisma/client';

const prismaClient = new PrismaClient();

export const upsertVisitorWithLinkedinUrl = async (email: string, linkedinUrl: string, domain: string) => {
	const upsertResult = await prismaClient.visitor.upsert({
		where: {
			email,
		},
		update: { linkedinUrl },
		create: { email, linkedinUrl },
		select: { id: true },
	});

	await prismaClient.visitorDomain.upsert({
		where: {
			unique_domain_visitorId: {
				domain: domain,
				visitorId: upsertResult.id,
			},
		},
		update: {},
		create: {
			visitorId: upsertResult.id,
			domain: domain,
		},
	});
};

export const upsertVisitorWithEnrichedData = async (
	email: string,
	enrichedData: Partial<
		Pick<
			Visitor,
			| 'firstName'
			| 'lastName'
			| 'title'
			| 'location'
			| 'companyName'
			| 'companySize'
			| 'companyIndustry'
			| 'companyWebsite'
			| 'companyDescription'
			| 'companyLocation'
		>
	>,
	domain: string,
) => {
	const upsertResult = await prismaClient.visitor.upsert({
		where: {
			email,
		},
		update: { ...enrichedData },
		create: { email, ...enrichedData },
		select: { id: true },
	});

	await prismaClient.visitorDomain.upsert({
		where: {
			unique_domain_visitorId: {
				domain: domain,
				visitorId: upsertResult.id,
			},
		},
		update: {},
		create: {
			visitorId: upsertResult.id,
			domain: domain,
		},
	});
};
