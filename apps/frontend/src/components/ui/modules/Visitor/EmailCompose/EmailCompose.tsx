'use client';

import React from 'react';

import { useVisitorsStore } from '@/lib/store/useVisitorsStore';
import EmailComposeView from './EmailCompose.view';

const EmailCompose = () => {
	const currentVisitor = useVisitorsStore((state) => state.currentVisitor);

	return <EmailComposeView currentVisitor={currentVisitor} />;
};

export default React.memo(EmailCompose);
