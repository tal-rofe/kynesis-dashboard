import type { Request, Response } from 'express';

import { getSignature, verifySignature } from '../utils/signature';

export const trackRepositoryStar = (req: Request, res: Response) => {
	try {
		const signature = getSignature(req.headers);

		if (!signature) {
			console.log('Signature not found');

			return res.status(403).send('Signature not found');
		}

		if (!verifySignature(req.body, signature, process.env.WEBHOOK_SECRET || '')) {
			console.log("Signature doesn't match", signature);

			return res.status(403).send('Signature does not match');
		}

		if (req.body.action === 'created') {
			console.log(`New star added to ${req.body.repository?.full_name} by ${req.body.sender?.login}`);
		} else if (req.body.action === 'deleted') {
			console.log(`Star removed from ${req.body.repository?.full_name} by ${req.body.sender?.login}`);
		}

		res.status(200).send('Event processed');
	} catch (error) {
		console.error('Error handling request:', error);
		res.status(500).send('Internal Server Error');
	}
};
