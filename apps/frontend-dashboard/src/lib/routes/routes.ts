export const routes = {
	dashboard: {
		path: '/dashboard',
		title: 'Dashboard',
		isRequiredAuth: true,
	},
	settings: {
		path: '/settings',
		title: 'Settings',
		isRequiredAuth: true,
	},
	visitors: {
		path: '/visitors',
		title: 'Visitors',
		isRequiredAuth: true,
	},
	prospects: {
		path: '/prospects',
		title: 'Prospects',
		isRequiredAuth: true,
	},
	login: {
		path: '/login',
		title: 'Login',
		isRequiredAuth: false,
	},
	signUp: {
		path: '/sign-up',
		title: 'Sign Up',
		isRequiredAuth: false,
	},
	onboarding: {
		path: '/onboarding',
		title: 'Onboarding',
		isRequiredAuth: true,
	},
} as const;
