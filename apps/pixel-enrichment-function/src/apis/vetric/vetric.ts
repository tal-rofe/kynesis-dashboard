import deepmerge from 'deepmerge';

import type LoggerService from '@kynesis/lambda-logger';
import ErrorCode from '@kynesis/error-codes';

import { vetricHttpGet } from './utils/http';

const apiUrls = [
	'https://api.vetric.io/linkedin/v1/profile/:identifier/overview',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/activity?type=posts',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/activity?type=comments',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/activity?type=reactions',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/experience',
	'https://api.vetric.io/linkedin/v1/company/:identifier/details',
];

export const getEnrichedData = async (logger: LoggerService, linkedinUrl: string) => {
	logger.info('Trying to enrich data for Linkedin URL', { linkedinUrl });

	const allResponses = await Promise.allSettled(apiUrls.map((apiUrl) => vetricHttpGet(apiUrl, linkedinUrl, process.env.VETRIC_API_KEY)));
	let baseObject: Record<string, unknown> = {};

	for (const [index, response] of allResponses.entries()) {
		if (response.status === 'fulfilled') {
			baseObject = deepmerge(baseObject, response.value);

			logger.info('Successfully enriched data from single API', { apiUrl: apiUrls[index] });
		} else {
			logger.warn(`Failed to get response from single API with an error: ${response.reason}`, {
				apiUrl: apiUrls[index],
				errorCode: ErrorCode.VETRIC_ENRICHMENT_API_ONE,
			});
		}
	}

	if (Object.keys(baseObject).length === 0) {
		throw new Error('Empty enriched data');
	}

	return baseObject;
};
