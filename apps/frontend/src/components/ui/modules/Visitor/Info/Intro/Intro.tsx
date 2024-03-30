'use client';

import React from 'react';

import { useVisitorsStore } from '@/lib/store/useVisitorsStore';
import IntroView from './Intro.view';

const Intro = () => {
	const currentVisitor = useVisitorsStore((state) => state.currentVisitor);
	const emailSubjects = useVisitorsStore((state) => state.emailSubjects);
	const setEmailSubjects = useVisitorsStore((state) => state.setEmailSubjects);

	return <IntroView currentVisitor={currentVisitor} emailSubjects={emailSubjects} setEmailSubjects={setEmailSubjects} />;
};

export default React.memo(Intro);
