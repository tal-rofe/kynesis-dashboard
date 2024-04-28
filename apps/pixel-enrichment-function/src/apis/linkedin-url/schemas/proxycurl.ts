import { z } from 'zod';

export const PersonLookupApiResponseSchema = z.object({
	url: z.string().url(),
});

export const ReverseEmailLookupApiResponseSchema = z.object({
	linkedin_profile_url: z.string().url(),
});
