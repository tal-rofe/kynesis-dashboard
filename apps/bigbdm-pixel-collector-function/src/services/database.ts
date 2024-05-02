import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const upsertVisitor = async (email: string, domain: string) => {
	const upsertResult = await prismaClient.visitor.upsert({
		where: {
			email,
		},
		update: { email },
		create: { email },
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
