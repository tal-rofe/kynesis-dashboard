import { PrismaClient } from '@prisma/client';
import pickBy from 'lodash.pickby';

import type { getEnrichedData } from '../apis/vetric/vetric';

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

export const upsertVisitorWithEnrichedData = async (email: string, enrichedData: Awaited<ReturnType<typeof getEnrichedData>>, domain: string) => {
	const cleanedObject = pickBy(enrichedData, (value) => value !== undefined);

	const upsertResult = await prismaClient.visitor.upsert({
		where: {
			email,
		},
		update: { ...cleanedObject },
		create: { email, ...cleanedObject },
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
