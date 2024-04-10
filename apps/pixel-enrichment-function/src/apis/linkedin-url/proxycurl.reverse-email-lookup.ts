import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';

import type { LinkedinUrlResponse } from './interfaces/response';
import { linkedinUrlHttpGet } from './utils/http';
import LinkedinUrl from './linkedin-url.abstract';

type ApiResponse = { readonly linkedin_profile_url: string };

class ProxycurlReverseEmailLookupApi extends LinkedinUrl {
	protected override apiUrl = 'https://nubela.co/proxycurl/api/linkedin/profile/resolve/email';

	public override async getLinkedinUrl(data: PixelCollectionData): Promise<LinkedinUrlResponse> {
		const requestSearchParams = new URLSearchParams();

		requestSearchParams.append('lookup_depth', 'superficial');
		requestSearchParams.append('email', data.email);
		requestSearchParams.append('enrich_profile', 'skip');

		const apiResponse = await linkedinUrlHttpGet<ApiResponse>(this.apiUrl, requestSearchParams, process.env.PROXYCURL_API_KEY);

		return apiResponse.linkedin_profile_url;
	}
}

export default ProxycurlReverseEmailLookupApi;
