import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_: NextApiRequest, res: NextApiResponse) {
	const generateHtmlScript = (url: string, includeAllSubDomains: boolean) => {
		includeAllSubDomains;

		return url;
	};

	generateHtmlScript('ss', true);

	res.status(200).json({ text: 'Hello' });
}
