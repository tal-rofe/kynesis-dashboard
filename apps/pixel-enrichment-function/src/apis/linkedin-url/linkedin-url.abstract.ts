import type { PixelApiRequestBodySchema } from '@kynesis/common-functions-types';

import type { LinkedinUrlResponse } from './interfaces/response';

abstract class LinkedinUrl {
	protected abstract apiUrl: string;

	public abstract getLinkedinUrl(data: PixelApiRequestBodySchema): Promise<LinkedinUrlResponse>;
}

export default LinkedinUrl;
