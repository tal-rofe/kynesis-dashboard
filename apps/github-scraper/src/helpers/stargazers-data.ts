import type { z } from 'zod';
import { TorControl } from 'tor-ctrl';

import ErrorCode from '@kynesis/error-codes';

import type { RepositoryStargazersResponseSchema } from '../schemas/repository-stargazers';
import { proxyAgents } from '../data/proxy-agents';
import LoggerService from '../services/logger';
import { StargazerDataResponseSchema } from '../schemas/stargazer-data';
import { getBaseHttp } from '../utils/http';
import { PROXY_RENEW_CIRCUIT_CONNECTION_PORT } from '../constants/proxy';
import { upsertStargazer } from '../services/database';

const getStargazerData = async (stargazerData: z.infer<typeof RepositoryStargazersResponseSchema>[number], proxyIndex: number) => {
	const baseHttp = getBaseHttp(
		proxyIndex,
		{
			Accept: 'application/vnd.github+json',
		},
		true,
	);

	let stargazerDataResponse = await baseHttp.get(stargazerData.userDetailsUrl);

	while (stargazerDataResponse.statusCode === 403) {
		LoggerService.warn('Failed to get stargazer data because of rate limit', {
			...stargazerData,
			errorCode: ErrorCode.GITHUB_API_RATE_LIMIT,
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

		stargazerDataResponse = await baseHttp.get(stargazerData.userDetailsUrl);
	}

	if (!stargazerDataResponse.ok) {
		LoggerService.warn('Failed to get stargazer data because of an error', {
			...stargazerData,
			error: stargazerDataResponse.body,
			errorCode: ErrorCode.GITHUB_API_STARGAZER_DATA,
			proxyIndex,
		});

		throw stargazerDataResponse.errored;
	}

	const validatedStargazerDataResponse = await StargazerDataResponseSchema.safeParseAsync(JSON.parse(stargazerDataResponse.body));

	if (!validatedStargazerDataResponse.success) {
		LoggerService.warn('Invalid stargazer data response', {
			errorCode: ErrorCode.GITHUB_API_STARGAZER_DATA_INVALID,
			invalidError: validatedStargazerDataResponse.error.message,
			proxyIndex,
			...stargazerData,
		});

		throw validatedStargazerDataResponse.error;
	}

	if (!validatedStargazerDataResponse.data.email) {
		throw new Error('Missing email');
	}

	upsertStargazer(validatedStargazerDataResponse.data.email, stargazerData.starredAt, validatedStargazerDataResponse.data).catch((error) => {
		LoggerService.warn('Failed to upsert stargazer in database', { errorCode: ErrorCode.UPSERT_DB, error });
	});

	return validatedStargazerDataResponse.data;
};

export const getStargazersData = async (repositoryStargazers: z.infer<typeof RepositoryStargazersResponseSchema>) => {
	const stargazersData: z.infer<typeof StargazerDataResponseSchema>[] = [];

	for (let i = 0; i < repositoryStargazers.length; i++) {
		const promises: ReturnType<typeof getStargazerData>[] = [];

		for (let j = 0; j < 10 * proxyAgents.length && i < repositoryStargazers.length; i++, j++) {
			promises.push(getStargazerData(repositoryStargazers[i]!, j % proxyAgents.length));
		}

		const results = await Promise.allSettled(promises);

		const onlyValidResults = results.filter(
			(result): result is PromiseFulfilledResult<z.infer<typeof StargazerDataResponseSchema>> => result.status === 'fulfilled',
		);

		const validStargazers = onlyValidResults.map((result) => result.value);

		stargazersData.push(...validStargazers);
	}

	return stargazersData;
};
