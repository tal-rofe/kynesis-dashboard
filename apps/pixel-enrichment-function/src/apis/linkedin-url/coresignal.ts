import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';

import { linkedinUrlHttpGet } from './utils/http';
import LinkedinUrl from './linkedin-url.abstract';
import { GetLinkedinUrlApiResponseSchema, GetMemberIdApiResponseSchema } from './schemas/coresignal';

class CoresignalApi extends LinkedinUrl {
	private getMemberIdApiUrl = 'https://api.coresignal.com/enrichment/contacts/reverse';

	protected override apiUrl = 'https://api.coresignal.com/cdapi/v1/linkedin/member/collect';

	public override async getLinkedinUrl(data: PixelCollectionData) {
		const getMemberIdRequestSearchParams = new URLSearchParams();

		getMemberIdRequestSearchParams.append('email', data.email);

		const getMemberIdApiResponse = await linkedinUrlHttpGet(
			this.getMemberIdApiUrl,
			getMemberIdRequestSearchParams,
			process.env.CORESIGNAL_API_KEY,
		);

		const validatedGetMemberIdApiResponse = await GetMemberIdApiResponseSchema.safeParseAsync(getMemberIdApiResponse);

		if (!validatedGetMemberIdApiResponse.success) {
			throw new Error(`validation error: ${validatedGetMemberIdApiResponse.error.message}. Coresignal response: ${getMemberIdApiResponse}`);
		}

		const getLinkedinUrlApiResponse = await linkedinUrlHttpGet(
			`${this.apiUrl}/${validatedGetMemberIdApiResponse.data.data.member_id}`,
			null,
			process.env.CORESIGNAL_API_KEY,
		);

		const validatedGetLinkedinUrlApiResponse = await GetLinkedinUrlApiResponseSchema.safeParseAsync(getLinkedinUrlApiResponse);

		if (!validatedGetLinkedinUrlApiResponse.success) {
			throw new Error(`validation error: ${validatedGetLinkedinUrlApiResponse.error.message}. Coresignal response: ${getMemberIdApiResponse}`);
		}

		return validatedGetLinkedinUrlApiResponse.data.url;
	}
}

export default CoresignalApi;
