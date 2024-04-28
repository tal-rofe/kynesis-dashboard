import type { PixelCollectionData } from '@kynesis/pixel-enrichment-sqs';

abstract class LinkedinUrl {
	protected abstract apiUrl: string;

	public abstract getLinkedinUrl(data: PixelCollectionData): Promise<string>;
}

export default LinkedinUrl;
