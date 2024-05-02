import { z } from 'zod';

export const CompanyDetailsResponseSchema = z
	.object({
		name: z.string().optional(),
		employee_count: z.number().optional(),
		industry: z
			.array(
				z.object({
					name: z.string().optional(),
				}),
			)
			.optional(),
		website_url: z.string().optional(),
		description: z.string().optional(),
		locations: z
			.array(
				z.object({
					address: z
						.object({
							country: z.string().optional(),
							city: z.string().optional(),
						})
						.optional(),
				}),
			)
			.optional(),
	})
	.transform((original) => {
		let companyLocation: string | undefined;

		if (original.locations && original.locations.length > 0) {
			const locationItem = original.locations[0]!;
			const city = locationItem.address?.city;
			const country = locationItem.address?.country;

			if (city && country) {
				companyLocation = `${city}, ${country}`;
			} else if (country) {
				companyLocation = country;
			} else if (city) {
				companyLocation = city;
			}
		}

		let companyIndustry: string | undefined;

		if (original.industry && original.industry.length > 0) {
			companyIndustry = original.industry[0]!.name;
		}

		return {
			companyName: original.name,
			companySize: original.employee_count,
			companyIndustry,
			companyWebsite: original.website_url,
			companyDescription: original.description,
			companyLocation,
		};
	});
