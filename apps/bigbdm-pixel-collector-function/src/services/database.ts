import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const upsertVisitor = async (email: string, domain: string, path?: string) => {
	const upsertResult = await prismaClient.visitor.upsert({
		where: {
			email,
		},
		update: { email, activity: { push: path ? { timestamp: new Date().toISOString(), source: path } : undefined } },
		create: { email, activity: path ? [{ timestamp: new Date().toISOString(), source: path }] : [] },
		select: { id: true },
	});

	await prismaClient.visitorDomain.upsert({
		where: {
			unique_domain_visitorId: {
				domain,
				visitorId: upsertResult.id,
			},
		},
		update: {},
		create: {
			visitorId: upsertResult.id,
			domain,
		},
	});
};
