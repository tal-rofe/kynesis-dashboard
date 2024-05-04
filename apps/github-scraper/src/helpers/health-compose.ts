import { v2 as dockerCompose } from 'docker-compose';

import ErrorCode from '@kynesis/error-codes';

import LoggerService from '../services/logger';

export const awaitProxiesContainerHealth = async () => {
	LoggerService.info('Awaiting docker proxies container to be healthy');

	try {
		const psResult = await dockerCompose.ps({ cwd: process.cwd() });
		const areAllReady = psResult.exitCode === 0 && psResult.data.services.every((service) => service.state.includes('healthy'));

		if (areAllReady) {
			return;
		}
	} catch (error) {
		LoggerService.warn('Failed to check health of containers', { errorCode: ErrorCode.AWAIT_DOCKER_PROXIES_CONTAINER_HEALTH, error });
	}

	await new Promise((resolve) => setTimeout(resolve, 5000));

	await awaitProxiesContainerHealth();

	return;
};
