import { z } from 'zod';

export const GetMemberIdApiResponseSchema = z.object({
	data: z.object({
		member_id: z.number().int().finite().positive(),
	}),
});

export const GetLinkedinUrlApiResponseSchema = z.object({
	url: z.string().url(),
});
