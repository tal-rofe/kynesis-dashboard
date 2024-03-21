export const routes = {
	dashboard: {
		path: '/',
		title: 'Dashboard',
		isRequiredAuth: true,
	},
	login: {
		path: '/login',
		title: 'Login',
		isRequiredAuth: false,
	},
	onboarding: {
		path: '/onboarding',
		title: 'Onboarding',
		isRequiredAuth: false,
	},
} as const;
