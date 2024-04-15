import type { CzVinylConfig } from 'cz-vinyl';

const czvinylConfig: CzVinylConfig = {
	headerFormat: '{type}: {emoji} [{ticket_id}] {subject}',
	allowEmptyTicketIdForBranches: ['main'],
	subjectMaxLength: 60,
};

export default czvinylConfig;
