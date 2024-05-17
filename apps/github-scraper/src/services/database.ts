import type { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import pickBy from 'lodash.pickby';

import type { StargazerDataResponseSchema } from '../schemas/stargazer-data';

const prismaClient = new PrismaClient();

export const upsertStargazer = async (
	email: string,
	starredAt: number | undefined,
	data: Omit<z.infer<typeof StargazerDataResponseSchema>, 'email'>,
	linkedinUrl: string | null,
) => {
	const cleanedObject = pickBy(data, (value) => value !== undefined);

	const visitorDocument = await prismaClient.visitor.findUnique({
		where: { email },
		select: { id: true, firstName: true, lastName: true, companyName: true, location: true, linkedinUrl: true },
	});

	let visitorDocumentId: string;

	if (visitorDocument === null) {
		const creationResult = await prismaClient.visitor.create({
			data: { email, ...cleanedObject, linkedinUrl },
			select: { id: true },
		});

		visitorDocumentId = creationResult.id;
	} else {
		visitorDocumentId = visitorDocument.id;

		// * Prioritize pixel data (or pre-exist data..) over GitHub data
		await prismaClient.visitor.update({
			where: { id: visitorDocument.id },
			data: {
				firstName: visitorDocument.firstName ?? data.firstName,
				lastName: visitorDocument.lastName ?? data.lastName,
				companyName: visitorDocument.companyName ?? data.companyName,
				location: visitorDocument.location ?? data.location,
				githubUsername: data.githubUsername,
				linkedinUrl: visitorDocument.linkedinUrl ?? linkedinUrl,
			},
		});
	}

	await prismaClient.visitorDomain.upsert({
		where: {
			unique_domain_visitorId: {
				visitorId: visitorDocumentId,
				domain: process.env.WEBSITE_DOMAIN,
			},
		},
		update: {
			activity: {
				push: starredAt
					? {
							timestamp: new Date(starredAt).toISOString(),
							githubRepositoryAction: `${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPOSITORY}:star`,
						}
					: undefined,
			},
		},
		create: {
			visitorId: visitorDocumentId,
			domain: process.env.WEBSITE_DOMAIN,
			activity: starredAt
				? [
						{
							timestamp: new Date(starredAt).toISOString(),
							githubRepositoryAction: `${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPOSITORY}:star`,
						},
					]
				: [],
		},
	});
};
