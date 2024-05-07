import type { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import pickBy from 'lodash.pickby';

import type { StargazerDataResponseSchema } from '../schemas/stargazer-data';

const prismaClient = new PrismaClient();

export const upsertStargazer = async (email: string, data: Omit<z.infer<typeof StargazerDataResponseSchema>, 'email'>) => {
	const cleanedObject = pickBy(data, (value) => value !== undefined);

	const visitorDocument = await prismaClient.visitor.findUnique({
		where: { email },
		select: { id: true, firstName: true, lastName: true, companyName: true, location: true },
	});

	if (visitorDocument === null) {
		return prismaClient.visitor.create({
			data: { email, ...cleanedObject },
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
	});
};
