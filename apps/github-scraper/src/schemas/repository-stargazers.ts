import { z } from 'zod';

const RepositoryStargazerItemSchema = z.object({
	starred_at: z.string().datetime().optional(),
	user: z.object({ url: z.string().url() }),
});

export const RepositoryStargazersResponseSchema = z.array(z.unknown()).transform((items) =>
	items
		.filter((item): item is z.infer<typeof RepositoryStargazerItemSchema> => RepositoryStargazerItemSchema.safeParse(item).success)
		.map((item) => ({
			starredAt: item.starred_at ? new Date(item.starred_at).getTime() : undefined,
			userDetailsUrl: item.user.url,
		})),
);
