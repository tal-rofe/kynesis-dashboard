'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { navElements } from '@/lib/data/nav-elements';
import { useVisitorsStore } from '@/lib/store/useVisitorsStore';

import SearchModalView from './SearchModal.view';

const SearchModal = () => {
	const pathname = usePathname();

	const pages = navElements.filter((element) => element.link !== pathname);

	const previousVisitors = useVisitorsStore((state) => state.previousVisitors);
	const setCurrentVisitor = useVisitorsStore((state) => state.setCurrentVisitor);

	return <SearchModalView pages={pages} setCurrentVisitor={setCurrentVisitor} previousVisitors={previousVisitors} />;
};

export default React.memo(SearchModal);
