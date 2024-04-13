'use client';

import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { routes } from '@/lib/routes';
import UISvg from '@/ui/UISvg';

const RightSide = () => {
	return (
		<div className="flex flex-col w-1/2 backdrop-blur-2xl shadow-white bg-auth min-w-[630px]">
			<Link className="pt-12 pr-12 text-black self-end" href={routes.login.path}>
				Login
			</Link>
			<div className="flex flex-col items-center text-black mt-56">
				<h1 className="flex flex-col items-center text-primary-foreground text-2xl font-semibold">Create your account</h1>
				<span className="mt-2 text-muted-foreground">Try it out free, includes 30 days of full feature access.</span>
				<button
					className="flex items-center justify-center text-base gap-2 font-medium mt-8 py-2 px-4 bg-white rounded-sm w-[407px]"
					type="button"
					onClick={() => signIn('google')}
				>
					<UISvg name="googleIcon" />
					Sign up with Google
				</button>
				<span className="text-muted-foreground mt-8">
					By clicking continue, you agree to our&nbsp;
					<Link className="underline" href="https://github.com/kynesis-io/usage-policies/blob/main/terms-of-service.mdx">
						Terms of Service
					</Link>
					&nbsp;and&nbsp;
					<Link className="underline" href="https://github.com/kynesis-io/usage-policies/blob/main/privacy-policy.mdx">
						Privacy Policy
					</Link>
				</span>
			</div>
		</div>
	);
};

export default React.memo(RightSide);
