import { getToken } from 'next-auth/jwt';
import type { JwtPayload } from 'jsonwebtoken';
import { type NextRequest, NextResponse } from 'next/server';

import { type RoutesPath, routes } from '@/lib/routes';

import { validateJwt } from './lib/utils/validate-jwt';

const middleware = async (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	const token = (await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })) as JwtPayload;

	const isAuthenticated = token?.exp ? validateJwt(token.exp) : false;

	const authorizedRoutes = Object.values(routes)
		.filter((route) => route.isRequiredAuth)
		.map((route) => route.path);

	const unauthorizedRoutes = Object.values(routes)
		.filter((route) => route.isRequiredAuth === false)
		.map((route) => route.path);

	const absoluteAuthorizedRoutesURL = new URL(routes.dashboard.path, request.nextUrl.origin);
	const absoluteUnAuthorizedRoutesURL = new URL(routes.login.path, request.nextUrl.origin);

	if (authorizedRoutes.includes(pathname as RoutesPath) && !isAuthenticated) {
		return NextResponse.redirect(absoluteUnAuthorizedRoutesURL.toString());
	}

	if (unauthorizedRoutes.includes(pathname as RoutesPath) && isAuthenticated) {
		return NextResponse.redirect(absoluteAuthorizedRoutesURL.toString());
	}

	return NextResponse.next();
};

export default middleware;
