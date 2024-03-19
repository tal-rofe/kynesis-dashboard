import type { CzVinylConfig } from 'cz-vinyl';

const czvinylConfig: CzVinylConfig = {
	headerFormat: '{type}: {emoji} {subject}',
	allowEmptyTicketIdForBranches: ['main'],
	skipTicketId: true,
};

export default czvinylConfig;
