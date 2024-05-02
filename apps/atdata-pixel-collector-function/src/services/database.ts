import { PrismaClient, type Visitor } from '@prisma/client';

const prismaClient = new PrismaClient();

export const upsertVisitor = async (email: string, data: Partial<Pick<Visitor, 'firstName' | 'lastName'>> & { url?: string }, domain: string) => {
	const upsertResult = await prismaClient.visitor.upsert({
		where: {
			email,
		},
		update: {
			firstName: data.firstName,
			lastName: data.lastName,
			activity: data.url ? { push: { timestamp: new Date().toISOString(), source: data.url } } : undefined,
		},
		create: {
			email,
			firstName: data.firstName,
			lastName: data.lastName,
			activity: data.url ? [{ timestamp: new Date().toISOString(), source: data.url }] : [],
		},
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
