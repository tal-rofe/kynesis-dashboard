import freeEmailDomains from 'free-email-domains';

import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';

import { linkedinUrlHttpGet } from './utils/http';
import LinkedinUrl from './linkedin-url.abstract';
import { PersonLookupApiResponseSchema } from './schemas/proxycurl';

class ProxycurlPersonLookupApi extends LinkedinUrl {
	protected override apiUrl = 'https://nubela.co/proxycurl/api/linkedin/profile/resolve';

	public override async getLinkedinUrl(data: PixelCollectionData) {
		// * Email will be valid as it is being validated on pixel data collection Lambda functions
		const emailDomain = data.email.split('@')[1]!;
		const emailDomainSplitted = emailDomain.split('.');
		const companyDomain = emailDomainSplitted.at(-2) + '.' + emailDomainSplitted.at(-1);

		if (freeEmailDomains.includes(companyDomain)) {
			throw new Error(
				`Cannot use ProxyCurl Person Lookup API because client is using known email provider ("${companyDomain}"), and isn't using business email`,
			);
		}

		const requestSearchParams = new URLSearchParams();

		requestSearchParams.append('company_domain', companyDomain);
		requestSearchParams.append('first_name', data.firstName!); // * Must have this field, otherwise this API is not being used
		requestSearchParams.append('similarity_checks', 'skip');
		requestSearchParams.append('enrich_profile', 'skip');
		requestSearchParams.append('location', 'United States');
		data.lastName && requestSearchParams.append('last_name', data.lastName);

		const apiResponse = await linkedinUrlHttpGet(this.apiUrl, requestSearchParams, process.env.PROXYCURL_API_KEY);

		const validatedApiResponse = await PersonLookupApiResponseSchema.safeParseAsync(apiResponse);

		if (!validatedApiResponse.success) {
			throw new Error(`validation error: ${validatedApiResponse.error.message}. Person lookup response: ${apiResponse}`);
		}

		return validatedApiResponse.data.url;
	}
}

export default ProxycurlPersonLookupApi;
