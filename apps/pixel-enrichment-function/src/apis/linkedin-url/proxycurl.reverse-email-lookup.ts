import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';

import { linkedinUrlHttpGet } from './utils/http';
import LinkedinUrl from './linkedin-url.abstract';
import { ReverseEmailLookupApiResponseSchema } from './schemas/proxycurl';

class ProxycurlReverseEmailLookupApi extends LinkedinUrl {
	protected override apiUrl = 'https://nubela.co/proxycurl/api/linkedin/profile/resolve/email';

	public override async getLinkedinUrl(data: PixelCollectionData) {
		const requestSearchParams = new URLSearchParams();

		requestSearchParams.append('lookup_depth', 'superficial');
		requestSearchParams.append('email', data.email);
		requestSearchParams.append('enrich_profile', 'skip');

		const apiResponse = await linkedinUrlHttpGet(this.apiUrl, requestSearchParams, process.env.PROXYCURL_API_KEY);

		const validatedApiResponse = await ReverseEmailLookupApiResponseSchema.safeParseAsync(apiResponse);

		if (!validatedApiResponse.success) {
			throw new Error(`validation error: ${validatedApiResponse.error.message}. Reverse email lookup response: ${apiResponse}`);
		}

		return validatedApiResponse.data.linkedin_profile_url;
	}
}

export default ProxycurlReverseEmailLookupApi;
