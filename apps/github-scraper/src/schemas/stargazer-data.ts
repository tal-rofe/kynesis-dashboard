import { z } from 'zod';

export const StargazerDataResponseSchema = z
	.object({
		email: z.string().nullable(),
		login: z.string(),
		name: z.string().optional().nullable(),
		company: z.string().optional().nullable(),
		location: z.string().optional().nullable(),
	})
	.transform((original) => {
		let firstName: string | undefined;
		let lastName: string | undefined;

		if (original.name) {
			const splittedName = original.name.split(' ');

			if (splittedName.length > 1) {
				firstName = splittedName[0]!;
				lastName = splittedName.slice(1).join(' ');
			} else {
				firstName = original.name;
			}
		}

		let companyName: string | undefined;

		if (original.company) {
			companyName = original.company.replace('@', '');
		}

		return {
			email: original.email,
			firstName,
			lastName,
			companyName,
			location: original.location ?? undefined,
			githubUsername: original.login,
		};
	});
