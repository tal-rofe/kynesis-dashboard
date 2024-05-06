/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'node:crypto';

export const getSignature = (headers: any): string | undefined => {
	for (const key of Object.keys(headers)) {
		if (key.toLowerCase() === 'x-hub-signature-256') {
			return headers[key];
		}
	}

	return undefined;
};

export const verifySignature = (payload: any, signature: string, secret: string): boolean => {
	const expectedSignature = 'sha256=' + crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');

	console.log('Expected signature:', expectedSignature);

	return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
};
