import { PrismaClient, type Visitor } from '@prisma/client';

const prismaClient = new PrismaClient();

export const upsertStarringStargazer = async (
	email: string,
	data: Pick<Visitor, 'firstName' | 'lastName' | 'companyName' | 'location' | 'githubUsername'>,
) => {
	const visitorDocument = await prismaClient.visitor.findUnique({
		where: { email },
		select: { id: true, firstName: true, lastName: true, companyName: true, location: true },
	});

	if (visitorDocument === null) {
		return prismaClient.visitor.create({
			data: {
				email,
				...data,
			},
			select: { id: true },
		});
	}

	// * Prioritize pixel data (or pre-exist data..) over GitHub data
	return prismaClient.visitor.update({
		where: { id: visitorDocument.id },
		data: {
			firstName: visitorDocument.firstName ?? data.firstName,
			lastName: visitorDocument.lastName ?? data.lastName,
			companyName: visitorDocument.companyName ?? data.companyName,
			location: visitorDocument.location ?? data.location,
			githubUsername: data.githubUsername,
		},
		select: { id: true },
	});
};

export const upsertVisitorDomain = async (domain: string, visitorId: string, repositoryFullName: string, starredAt: string | null) => {
	const action = starredAt ? 'star' : 'unstar';

	await prismaClient.visitorDomain.upsert({
		where: { unique_domain_visitorId: { domain, visitorId } },
		update: {
			activity: {
				push: {
					timestamp: starredAt ?? new Date().toISOString(),
					githubRepositoryAction: `${repositoryFullName}:${action}`,
				},
			},
		},
		create: {
			domain,
			visitorId,
			activity: [
				{
					timestamp: starredAt ?? new Date().toISOString(),
					githubRepositoryAction: `${repositoryFullName}:${action}`,
				},
			],
		},
	});
};
