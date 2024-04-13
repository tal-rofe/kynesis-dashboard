'use client';

import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { routes } from '@/lib/routes';
import UISvg from '@/ui/UISvg';
import UIBrandLogo from '@/ui/UIBrandLogo';

const Login = () => {
	return (
		<div className="flex flex-col items-center backdrop-blur-2xl shadow-white bg-auth h-screen">
			<span className="mt-12">
				<UIBrandLogo type="icon-text" />
			</span>
			<div className="flex flex-col items-center text-black mt-56">
				<h1 className="flex flex-col items-center text-primary-foreground text-2xl font-semibold">Login</h1>
				<span className="mt-2 text-muted-foreground">Welcome back!</span>
				<button
					className="flex items-center justify-center text-base gap-2 font-medium mt-8 py-2 px-4 bg-white rounded-sm w-[407px]"
					type="button"
					onClick={() => signIn('google')}
				>
					<UISvg name="googleIcon" />
					Login with Google
				</button>
				<span className="gap-1 mt-8">
					<span>Not signed up yet?</span>
					&nbsp;
					<Link className="font-medium" href={routes.signUp.path}>
						Create your account
					</Link>
				</span>
			</div>
		</div>
	);
};

export default React.memo(Login);
