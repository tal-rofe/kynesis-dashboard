'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
	readonly children: React.ReactNode;
};

const AuthSessionProvider = (props: Props) => {
	return <SessionProvider>{props.children}</SessionProvider>;
};

export default React.memo(AuthSessionProvider);
