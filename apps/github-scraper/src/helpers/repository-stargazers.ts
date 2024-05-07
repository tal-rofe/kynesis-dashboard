import { TorControl } from 'tor-ctrl';
import type { z } from 'zod';

import ErrorCode from '@kynesis/error-codes';

import { MAX_STARGAZERS_PAGES, STARGAZERS_IN_PAGE } from '../constants/stargazers-page';
import { proxyAgents } from '../data/proxy-agents';
import { RepositoryStargazersResponseSchema } from '../schemas/repository-stargazers';
import LoggerService from '../services/logger';
import { getBaseHttp } from '../utils/http';
import { PROXY_RENEW_CIRCUIT_CONNECTION_PORT } from '../constants/proxy';

const getPageStargazers = async (proxyIndex: number, page: number) => {
	const searchParams = new URLSearchParams({ per_page: STARGAZERS_IN_PAGE.toString(), page: page.toString() });

	const baseHttp = getBaseHttp(proxyIndex, {
		Accept: 'application/vnd.github.star+json',
	}).extend({ searchParams });

	let pageResponse = await baseHttp.get(`https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPOSITORY}/stargazers`);

	while (pageResponse.statusCode === 403) {
		LoggerService.warn('Failed to get stargazers for page because of rate limit', {
			errorCode: ErrorCode.GITHUB_API_RATE_LIMIT,
			page,
			proxyIndex,
		});

		const torControl = new TorControl({
			host: 'localhost',
			port: PROXY_RENEW_CIRCUIT_CONNECTION_PORT + proxyIndex,
			password: 'password',
		});

		await torControl.connect();
		await torControl.signalNewNym();
		await torControl.disconnect();

		pageResponse = await baseHttp.get(`https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPOSITORY}/stargazers`);
	}

	if (!pageResponse.ok) {
		LoggerService.warn('Failed to get stargazers for page because of an error', {
			error: pageResponse.body,
			errorCode: ErrorCode.GITHUB_API_STARGAZERS,
			page,
			proxyIndex,
		});

		throw pageResponse.errored;
	}

	const validatedPageResponse = await RepositoryStargazersResponseSchema.safeParseAsync(JSON.parse(pageResponse.body));

	if (!validatedPageResponse.success) {
		LoggerService.warn('Invalid page response', {
			errorCode: ErrorCode.GITHUB_API_STARGAZERS_INVALID,
			invalidError: validatedPageResponse.error.message,
			proxyIndex,
			page,
		});

		throw validatedPageResponse.error;
	}

	return validatedPageResponse.data;
};

export const getRepositoryStargazers = async (count: number) => {
	// * GitHub restrict 400 pages
	const numberOfPagesToScrape = Math.min(Math.ceil(count / STARGAZERS_IN_PAGE), MAX_STARGAZERS_PAGES);

	const repositoryStargazers: z.infer<typeof RepositoryStargazersResponseSchema>[] = [];

	for (let i = 1; i <= numberOfPagesToScrape; i++) {
		const promises: ReturnType<typeof getPageStargazers>[] = [];

		for (let j = 0; j < 10 * proxyAgents.length && i <= numberOfPagesToScrape; i++, j++) {
			promises.push(getPageStargazers(j % proxyAgents.length, i));
		}

		const results = await Promise.allSettled(promises);

		const validStargazers = results
			.filter((result): result is PromiseFulfilledResult<z.infer<typeof RepositoryStargazersResponseSchema>> => result.status === 'fulfilled')
			.map((result) => result.value);

		repositoryStargazers.push(...validStargazers);
	}

	return repositoryStargazers.flat();
};
