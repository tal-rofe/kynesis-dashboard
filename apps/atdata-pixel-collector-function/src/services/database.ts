import { PrismaClient } from '@prisma/client';
import type { z } from 'zod';
import pickBy from 'lodash.pickby';

import type { PixelUnitSchema } from '../schemas/pixel-unit-schema';

const prismaClient = new PrismaClient();

export const upsertVisitor = async (
	email: string,
	data: Pick<z.infer<typeof PixelUnitSchema>, 'firstName' | 'lastName' | 'url' | 'originDomain'>,
) => {
	const cleanedObject = pickBy(data, (value) => value !== undefined);

	delete cleanedObject['url'];
	delete cleanedObject['originDomain'];

	const upsertResult = await prismaClient.visitor.upsert({
		where: { email },
		update: cleanedObject,
		create: {
			email,
			...cleanedObject,
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
		update: {
			activity: { push: data.url ? { timestamp: new Date().toISOString(), websiteUrl: data.url } : undefined },
		},
		create: {
			visitorId: upsertResult.id,
			domain: data.originDomain,
			activity: data.url ? [{ timestamp: new Date().toISOString(), websiteUrl: data.url }] : [],
		},
	});
};
