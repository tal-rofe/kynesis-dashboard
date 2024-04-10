import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';

import type { LinkedinUrlResponse } from './interfaces/response';

abstract class LinkedinUrl {
	protected abstract apiUrl: string;

	public abstract getLinkedinUrl(data: PixelCollectionData): Promise<LinkedinUrlResponse>;
}

export default LinkedinUrl;
