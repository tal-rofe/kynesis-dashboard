import { z } from 'zod';

export const RepositoryStargazersCountResponseSchema = z.object({
	stargazers_count: z.number().int().positive().nonnegative(),
});
