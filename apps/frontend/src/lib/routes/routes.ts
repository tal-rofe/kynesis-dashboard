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
} as const;
