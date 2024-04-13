'use client';

import React from 'react';

import { useVisitorsStore } from '@/lib/store/useVisitorsStore';

import EmailComposeView from './EmailCompose.view';

const EmailCompose = () => {
	const currentVisitor = useVisitorsStore((state) => state.currentVisitor);
	const emailSubjects = useVisitorsStore((state) => state.emailSubjects);
	const setEmailSubjects = useVisitorsStore((state) => state.setEmailSubjects);

	return <EmailComposeView currentVisitor={currentVisitor} emailSubjects={emailSubjects} setEmailSubjects={setEmailSubjects} />;
};

export default React.memo(EmailCompose);
