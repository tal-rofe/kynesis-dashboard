import deepmerge from 'deepmerge';

import LoggerService from '@/services/logger';

import { vetricHttpGet } from './utils/http';

const apiUrls = [
	'https://api.vetric.io/linkedin/v1/profile/:identifier/overview',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/about',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/experience',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/skills',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/education',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/contact-info',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/activity?type=posts',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/activity?type=comments',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/activity?type=reactions',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/interests?type=influencers',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/interests?type=companies',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/interests?type=groups',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/interests?type=newsletters',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/interests?type=schools',
	'https://api.vetric.io/linkedin/v1/profile/:identifier/languages',
];

export const getEnrichedData = async (requestId: string, linkedinUrl: string) => {
	const logger = new LoggerService(requestId);

	logger.info(`Trying to enrich data for Linkedin URL: "${linkedinUrl}"`);

	const allResponses = await Promise.allSettled(apiUrls.map((apiUrl) => vetricHttpGet(apiUrl, linkedinUrl, process.env.VETRIC_API_KEY)));
	let baseObject: Record<string, unknown> = {};

	for (const [index, response] of allResponses.entries()) {
		if (response.status === 'fulfilled') {
			baseObject = deepmerge(baseObject, response.value);
		} else {
			logger.warn(`Failed to get response from Vetric API: "${apiUrls[index]}" with an error: ${response.reason}`);
		}
	}

	if (Object.keys(baseObject).length === 0) {
		throw new Error('Empty enriched data');
	}

	return baseObject;
};
