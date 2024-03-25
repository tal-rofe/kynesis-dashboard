import { z } from 'zod';

export const pixelApiRequestBodySchema = z.object({
	email: z
		.string({ required_error: '"email" key is missing', invalid_type_error: '"email" key must be "string"' })
		.email({ message: '"email" key must be valid email' }),
	firstName: z.string({ required_error: '"firstName" key is missing', invalid_type_error: '"firstName" key must be "string"' }),
	lastName: z.string({ required_error: '"lastName" key is missing', invalid_type_error: '"lastName" key must be "string"' }),
	md5Email: z.string({ required_error: '"md5Email" key is missing', invalid_type_error: '"md5Email" key must be "string"' }),
});

export type PixelApiRequestBodySchema = z.infer<typeof pixelApiRequestBodySchema>;
