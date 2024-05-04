import { TorControl } from 'tor-ctrl';

import ErrorCode from '@kynesis/error-codes';

import { RepositoryStargazersCountResponseSchema } from '../schemas/repository-stargazers-count';
import LoggerService from '../services/logger';
import { getBaseHttp } from '../utils/http';

export const getRepositoryStargazersCount = async () => {
	LoggerService.info(
		'Querying stargazers count of repository',
		{ githubOwner: process.env.GITHUB_OWNER, githubRepository: process.env.GITHUB_REPOSITORY },
		true,
	);

	const baseHttp = getBaseHttp(0);

	let response = await baseHttp.get(`https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPOSITORY}`);

	while (response.statusCode === 403) {
		LoggerService.warn('Failed to get stargazers count because of rate limit', {
			errorCode: ErrorCode.GITHUB_API_RATE_LIMIT,
		});

		const torControl = new TorControl({
			host: 'localhost',
			port: 9051,
			password: 'password',
		});

		await torControl.connect();
		await torControl.signalNewNym();
		await torControl.disconnect();

		response = await baseHttp.get(`https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPOSITORY}`);
	}

	if (!response.ok) {
		LoggerService.warn('Failed to get stargazers count because of an error', {
			errorCode: ErrorCode.GITHUB_API_STARGAZERS_COUNT,
			error: response.body,
		});

		throw response.errored;
	}

	const validatedResponse = await RepositoryStargazersCountResponseSchema.safeParseAsync(JSON.parse(response.body));

	if (!validatedResponse.success) {
		LoggerService.error('Invalid stargazers count response', {
			response,
			validationError: validatedResponse.error.message,
			errorCode: ErrorCode.REPOSITORY_STARGAZERS_COUNT,
		});

		throw validatedResponse.error;
	}

	LoggerService.info('Successfully fetched stargazers count', { stargazersCount: validatedResponse.data.stargazers_count });

	return validatedResponse.data.stargazers_count;
};
