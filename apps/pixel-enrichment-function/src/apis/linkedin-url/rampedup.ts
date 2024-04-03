import freeEmailDomains from 'free-email-domains';
import type { PixelApiRequestBodySchema } from '@kynesis/common-functions-types';

import type { LinkedinUrlResponse } from './interfaces/response';
import { linkedinUrlHttpPost } from './utils/http';
import LinkedinUrl from './linkedin-url.abstract';

type ApiResponse = { readonly contactLinkedinUrl: string };

class RampedupApi extends LinkedinUrl {
	protected override apiUrl = 'https://basic.rampedup.io/api/manualappend/contact';

	public override async getLinkedinUrl(data: PixelApiRequestBodySchema): Promise<LinkedinUrlResponse> {
		// * Email will be valid as it is being validated on "pixel-api-function"
		const emailDomain = data.email.split('@')[1]!;
		const emailDomainSplitted = emailDomain.split('.');
		const companyDomain = emailDomainSplitted.at(-2) + '.' + emailDomainSplitted.at(-1);

		const extraData: Record<string, string> = {};

		if (!freeEmailDomains.includes(companyDomain)) {
			extraData['company'] = emailDomainSplitted.at(-2)!;
		}

		const apiResponse = await linkedinUrlHttpPost<ApiResponse>(
			this.apiUrl,
			{
				emailAddress: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				md5HashedEmailAddress: data.md5Email,
				...extraData,
			},
			process.env.RAMPEDUP_API_KEY,
		);

		return apiResponse.contactLinkedinUrl;
	}
}

export default RampedupApi;
