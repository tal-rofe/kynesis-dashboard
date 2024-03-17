import { NextResponse, type NextRequest } from 'next/server';

import { type RoutesPath, routes } from '@/lib/routes';

const middleware = (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	const isAuthenticate = true;

	const authorizedRoutes = Object.values(routes)
		.filter((route) => route.isRequiredAuth)
		.map((route) => route.path);

	const unauthorizedRoutes = Object.values(routes)
		.filter((route) => route.isRequiredAuth === false)
		.map((route) => route.path);

	const absoluteAuthorizedRoutesURL = new URL(routes.dashboard.path, request.nextUrl.origin);
	const absoluteUnAuthorizedRoutesURL = new URL(routes.login.path, request.nextUrl.origin);

	if (authorizedRoutes.includes(pathname as RoutesPath) && !isAuthenticate) {
		return NextResponse.redirect(absoluteUnAuthorizedRoutesURL.toString());
	}

	if (unauthorizedRoutes.includes(pathname as RoutesPath) && isAuthenticate) {
		return NextResponse.redirect(absoluteAuthorizedRoutesURL.toString());
	}

	return NextResponse.next();
};

export default middleware;
