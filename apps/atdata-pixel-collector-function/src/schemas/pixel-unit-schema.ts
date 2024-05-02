import { z } from 'zod';

export const PixelUnitSchema = z
	.object({
		label: z.string(),
		target_email: z.string().email(),
		md5: z.string(),
		first_name: z.string().optional(),
		last_name: z.string().optional(),
		url: z.string().optional(),
	})
	.transform((origin) => ({
		originDomain: origin.label,
		email: origin.target_email,
		md5Email: origin.md5,
		firstName: origin.first_name,
		lastName: origin.last_name,
		url: origin.url,
	}));
