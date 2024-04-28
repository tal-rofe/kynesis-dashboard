import freeEmailDomains from 'free-email-domains';

import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';

import { linkedinUrlHttpPost } from './utils/http';
import LinkedinUrl from './linkedin-url.abstract';
import { ApiResponseSchema } from './schemas/rampedup';

class RampedupApi extends LinkedinUrl {
	protected override apiUrl = 'https://basic.rampedup.io/api/manualappend/contact';

	public override async getLinkedinUrl(data: PixelCollectionData) {
		// * Email will be valid as it is being validated on other Lambda functions
		const emailDomain = data.email.split('@')[1]!;
		const emailDomainSplitted = emailDomain.split('.');
		const companyDomain = emailDomainSplitted.at(-2) + '.' + emailDomainSplitted.at(-1);

		const extraData: Record<string, string> = {};

		if (!freeEmailDomains.includes(companyDomain)) {
			extraData['company'] = emailDomainSplitted.at(-2)!;
		}

		const apiResponse = await linkedinUrlHttpPost(
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

		const validatedApiResponse = await ApiResponseSchema.safeParseAsync(apiResponse);

		if (!validatedApiResponse.success) {
			throw new Error(`validation error: ${validatedApiResponse.error.message}. RampedUp response: ${apiResponse}`);
		}

		return validatedApiResponse.data.contactLinkedinUrl;
	}
}

export default RampedupApi;
