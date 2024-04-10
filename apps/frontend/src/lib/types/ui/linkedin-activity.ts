export type ActivityTypes = 'post' | 'comment' | 'reaction';

export type LinkedInActivity = {
	readonly id: string;
	readonly activityType: ActivityTypes;
	readonly image?: string;
	readonly content: string;
	readonly postedDate: Date;
	readonly postedByName?: string;
	readonly postedByLink?: string;
	readonly link: string;
};
