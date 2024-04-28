import { z } from 'zod';

export const ApiResponseSchema = z.object({
	contactLinkedinUrl: z.string().url(),
});
