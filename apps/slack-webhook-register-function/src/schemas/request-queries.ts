import { z } from 'zod';

export const requestQueriesSchema = z.object({
	code: z
		.string({ required_error: '"code" key is missing', invalid_type_error: '"code" key must be "string"' })
		.min(1, { message: '"code" key must be non-empty' }),
});
