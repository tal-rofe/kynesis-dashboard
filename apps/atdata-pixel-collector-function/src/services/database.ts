import { PrismaClient } from '@prisma/client';
import type { z } from 'zod';

import type { PixelUnitSchema } from '../schemas/pixel-unit-schema';

const prismaClient = new PrismaClient();

export const upsertVisitor = async (
	email: string,
	data: Pick<z.infer<typeof PixelUnitSchema>, 'firstName' | 'lastName' | 'url' | 'originDomain'>,
) => {
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
				domain: data.originDomain,
				visitorId: upsertResult.id,
			},
		},
		update: {},
		create: {
			visitorId: upsertResult.id,
			domain: data.originDomain,
		},
	});
};
