'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { navElements } from '@/lib/data/nav-elements';
import { useVisitorsStore } from '@/lib/store/useVisitorsStore';

import HeaderView from './Header.view';

const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const currentVisitor = useVisitorsStore((state) => state.currentVisitor);
	const setCurrentVisitor = useVisitorsStore((state) => state.setCurrentVisitor);
	const resetEmailSubjects = useVisitorsStore((state) => state.resetEmailSubjects);

	const currentPage = navElements.find((element) => element.link === `/${pathname.split('/')[1]}`);

	const onNavBack = () => {
		const newPathname = pathname.split('/').slice(0, -1).join('/');

		setCurrentVisitor(undefined);
		resetEmailSubjects();

		router.push(newPathname);
	};

	return <HeaderView currentVisitor={currentVisitor} currentPage={currentPage} onNavBack={onNavBack} />;
};

export default React.memo(Header);
