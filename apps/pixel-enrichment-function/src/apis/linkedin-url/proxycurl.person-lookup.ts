import freeEmailDomains from 'free-email-domains';
import type { PixelApiRequestBodySchema } from '@kynesis/common-functions-types';

import type { LinkedinUrlResponse } from '@/interfaces/linkedin-url';
import { httpGet } from '@/utils/linkedin-url-http';

import LinkedinUrl from './linkedin-url.abstract';

type ApiResponse = { readonly url: string };

class ProxycurlPersonLookupApi extends LinkedinUrl {
	protected override apiUrl = 'https://nubela.co/proxycurl/api/linkedin/profile/resolve';

	public override async getLinkedinUrl(data: PixelApiRequestBodySchema): Promise<LinkedinUrlResponse> {
		// * Email will be valid as it is being validated on "pixel-api-function"
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
		requestSearchParams.append('first_name', data.firstName);
		requestSearchParams.append('similarity_checks', 'skip');
		requestSearchParams.append('enrich_profile', 'skip');
		requestSearchParams.append('location', 'United States');
		requestSearchParams.append('last_name', data.lastName);

		const apiResponse = await httpGet<ApiResponse>(this.apiUrl, requestSearchParams, process.env.PROXYCURL_API_KEY);

		return apiResponse.url;
	}
}

export default ProxycurlPersonLookupApi;
