import got from 'got';

import type LoggerService from '@kynesis/lambda-logger';
import ErrorCode from '@kynesis/error-codes';

import { API_CALL_RETRIES, API_CALL_TIMEOUT } from '@/constants/http-api';

import { ProfileOverviewResponseSchema } from './schemas/profile-overview';
import { CompanyDetailsResponseSchema } from './schemas/company-details';

const getProfileOverviewData = async (logger: LoggerService, linkedinUrl: string) => {
	logger.info('Trying to enrich data for Linkedin URL', { linkedinUrl });

	const linkedinIdentifier = new URL(linkedinUrl)?.pathname?.split('/')?.[2];

	if (!linkedinIdentifier) {
		throw new Error('Missing LinkedIn identifier');
	}

	const profileOverviewResponse = await got
		.get(`https://api.vetric.io/linkedin/v1/profile/${linkedinIdentifier}/overview`, {
			headers: { 'x-api-key': process.env.VETRIC_API_KEY },
			timeout: { request: API_CALL_TIMEOUT },
			retry: {
				limit: API_CALL_RETRIES,
				methods: ['HEAD', 'OPTIONS', 'TRACE', 'GET'],
				// * Keep others (backoff limit, ...) as default
			},
		})
		.json();

	const validatedProfileOverviewResponse = await ProfileOverviewResponseSchema.safeParseAsync(profileOverviewResponse);

	if (!validatedProfileOverviewResponse.success) {
		logger.error('Failed to validate profile overview response', {
			errorCode: ErrorCode.VETRIC_PROFILE_OVERVIEW_ENRICHMENT,
			validationError: validatedProfileOverviewResponse.error.message,
		});

		throw new Error('Failed to validate profile overview response');
	}

	return validatedProfileOverviewResponse.data;
};

export const getEnrichedData = async (logger: LoggerService, linkedinUrl: string) => {
	const profileOverviewData = await getProfileOverviewData(logger, linkedinUrl);

	// * If missing company universal name field, cannot proceed to the second API as this field is required
	if (!profileOverviewData.companyUniversalName) {
		logger.warn('Missing company universal name, returns more lean data', {
			errorCode: ErrorCode.VETRIC_MISSING_COMPANY_UNIVERSAL_NAME,
			responseData: profileOverviewData,
		});

		return profileOverviewData;
	}

	// * Irrelevant field for enrichment result
	delete profileOverviewData.companyUniversalName;

	const companyDetailsResponse = await got
		.get(`https://api.vetric.io/linkedin/v1/company/${profileOverviewData.companyUniversalName}/details`, {
			headers: { 'x-api-key': process.env.VETRIC_API_KEY },
			timeout: { request: API_CALL_TIMEOUT },
			retry: {
				limit: API_CALL_RETRIES,
				methods: ['HEAD', 'OPTIONS', 'TRACE', 'GET'],
				// * Keep others (backoff limit, ...) as default
			},
		})
		.json();

	const validatedCompanyDetailsResponse = await CompanyDetailsResponseSchema.safeParseAsync(companyDetailsResponse);

	// * If failed to validate the company details response, just return more lean data
	if (!validatedCompanyDetailsResponse.success) {
		logger.warn('Failed to validate company details response, returned more lean data', {
			errorCode: ErrorCode.VETRIC_COMPANY_DETAILS_ENRICHMENT,
		});

		return profileOverviewData;
	}

	return {
		...profileOverviewData,
		...validatedCompanyDetailsResponse.data,
	};
};
