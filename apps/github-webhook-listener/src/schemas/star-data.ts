import { z } from 'zod';

export const StarDataSchema = z.object({
	action: z.enum(['created', 'deleted']),
	starred_at: z.string().datetime().nullable(),
	repository: z.object({
		full_name: z.string(),
	}),
	sender: z.object({
		login: z.string(),
	}),
	organization: z.object({
		login: z.string(),
	}),
	installation: z.object({
		id: z.number(),
	}),
});
