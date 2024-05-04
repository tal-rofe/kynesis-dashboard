import { z } from 'zod';

export const RepositoryStargazersResponseSchema = z.array(
	z
		.object({
			starred_at: z.string().datetime().optional(),
			user: z.object({ url: z.string().url() }),
		})
		.transform((original) => ({
			starredAt: original.starred_at ? new Date(original.starred_at).getTime() : undefined,
			userDetailsUrl: original.user.url,
		})),
);
