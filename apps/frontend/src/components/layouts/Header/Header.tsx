'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { navElements } from '@/lib/data/nav-elements';

import HeaderView from './Header.view';

const Header = () => {
	const pathname = usePathname();

	const currentPage = navElements.find((element) => element.link === pathname);

	return <HeaderView currentPage={currentPage} />;
};

export default React.memo(Header);
