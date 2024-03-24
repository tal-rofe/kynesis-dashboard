export type Visitor = {
	readonly id: string;
	readonly fullName: string;
	readonly email: string;
	readonly status: 'pending' | 'processing' | 'success' | 'failed';
	readonly priority: 'low' | 'medium' | 'high';
};
