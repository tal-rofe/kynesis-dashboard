import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const upsertVisitor = async (email: string, domain: string, path?: string) => {
	const upsertResult = await prismaClient.visitor.upsert({
		where: { email },
		update: {},
		create: { email },
		select: { id: true },
	});

	await prismaClient.visitorDomain.upsert({
		where: {
			unique_domain_visitorId: {
				domain,
				visitorId: upsertResult.id,
			},
		},
		update: {
			activity: { push: path ? { timestamp: new Date().toISOString(), websiteUrl: path } : undefined },
		},
		create: {
			visitorId: upsertResult.id,
			domain,
			activity: path ? [{ timestamp: new Date().toISOString(), websiteUrl: path }] : [],
		},
	});
};
