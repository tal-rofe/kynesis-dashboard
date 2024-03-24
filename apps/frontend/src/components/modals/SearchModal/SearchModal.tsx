'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { navElements } from '@/lib/data/nav-elements';

import SearchModalView from './SearchModal.view';

const SearchModal = () => {
	const pathname = usePathname();

	const pages = navElements.filter((element) => element.link !== pathname);

	return <SearchModalView pages={pages} />;
};

export default React.memo(SearchModal);
