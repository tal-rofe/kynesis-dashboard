import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

import { type RoutesPath, routes } from '@/lib/routes';

const middleware = async (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	const session = await getToken({ req: request, secret: process.env['NEXTAUTH_SECRET'] });

	const isAuthenticate = Boolean(session);

	const authorizedRoutes = Object.values(routes)
		.filter((route) => route.isRequiredAuth)
		.map((route) => route.path);

	const unauthorizedRoutes = Object.values(routes)
		.filter((route) => route.isRequiredAuth === false)
		.map((route) => route.path);

	const absoluteAuthorizedRoutesURL = new URL(routes.visitors.path, request.nextUrl.origin);
	const absoluteUnAuthorizedRoutesURL = new URL(routes.onboarding.path, request.nextUrl.origin);

	if (authorizedRoutes.includes(pathname as RoutesPath) && !isAuthenticate) {
		return NextResponse.redirect(absoluteUnAuthorizedRoutesURL.toString());
	}

	if (unauthorizedRoutes.includes(pathname as RoutesPath) && isAuthenticate) {
		return NextResponse.redirect(absoluteAuthorizedRoutesURL.toString());
	}

	return NextResponse.next();
};

export default middleware;
