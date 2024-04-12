import { z } from 'zod';

export const PixelUnitSchema = z.object({
	originDomain: z.string(),
	email: z.string().email(),
	md5Email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
});
