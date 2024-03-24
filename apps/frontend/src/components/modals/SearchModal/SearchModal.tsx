'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { navElements } from '@/lib/data/nav-elements';

import SearchModalView from './SearchModal.view';

const SearchModal = () => {
	const pathname = usePathname();
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (!searchInputRef.current) return;

		searchInputRef.current.focus();
	}, []);

	const pages = navElements.filter((element) => element.link !== pathname);

	return <SearchModalView pages={pages} ref={searchInputRef} />;
};

export default React.memo(SearchModal);
