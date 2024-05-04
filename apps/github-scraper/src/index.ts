import ErrorCode from '@kynesis/error-codes';

import { awaitProxiesContainerHealth } from './helpers/health-compose';
import { getRepositoryStargazers } from './helpers/repository-stargazers';
import { getRepositoryStargazersCount } from './helpers/repository-stargazers-count';
import LoggerService from './services/logger';
import { PROXIES_HEALTH_TIMEOUT } from './constants/proxy';
import { getStargazersData } from './helpers/stargazers-data';

(async () => {
	const proxiesContainerHealthTimeout = setTimeout(() => {
		LoggerService.error('Failed to check health of proxies containers', { errorCode: ErrorCode.AWAIT_DOCKER_PROXIES_CONTAINER_HEALTH });

		process.exit(1);
	}, PROXIES_HEALTH_TIMEOUT);

	await awaitProxiesContainerHealth();

	clearTimeout(proxiesContainerHealthTimeout);

	let repositoryStargazersCount: number;

	try {
		repositoryStargazersCount = await getRepositoryStargazersCount();
	} catch (error) {
		LoggerService.error('Failed to fetch stargazers count', { errorCode: ErrorCode.REPOSITORY_STARGAZERS_COUNT, error });

		return;
	}

	if (repositoryStargazersCount === 0) {
		return;
	}

	const repositoryStargazers = await getRepositoryStargazers(repositoryStargazersCount);

	LoggerService.info('Successfully fetched repository stargazers', { fetchedStargazersCount: repositoryStargazers.length });

	const stargazersData = await getStargazersData(repositoryStargazers);

	LoggerService.info('Successfully fetched stargazers data', { fetchedStargazersDataCount: stargazersData.length });
})();
