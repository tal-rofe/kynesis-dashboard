import { z } from 'zod';

export const ProfileOverviewResponseSchema = z
	.object({
		first_name: z.string().optional(),
		last_name: z.string().optional(),
		headline: z.string().optional(),
		location: z.object({
			name: z.string().optional(),
			country: z.object({ name: z.string().optional() }).optional(),
		}),
		top_position: z
			.object({
				company_info: z
					.object({
						name: z.string().optional(),
						universal_name: z.string().optional(),
					})
					.optional(),
			})
			.optional(),
	})
	.transform((original) => {
		const city = original.location.name;
		const country = original.location.country?.name;

		let location: string | undefined;

		if (city && country) {
			location = `${city}, ${country}`;
		} else if (country) {
			location = country;
		} else if (city) {
			location = city;
		}

		return {
			firstName: original.first_name,
			lastName: original.last_name,
			title: original.headline,
			location,
			companyName: original.top_position?.company_info?.name,
			companyUniversalName: original.top_position?.company_info?.universal_name,
		};
	});
