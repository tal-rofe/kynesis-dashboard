'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { type SidebarElement as SidebarElementType } from '@/lib/types/ui/nav-element';
import SidebarElementView from './SidebarElement.view';

type Props = {
	readonly sidebarElement: SidebarElementType;
};

const SidebarElement = (props: Props) => {
	const pathname = usePathname();

	const isActive = pathname === props.sidebarElement.link;

	const { sidebarElement } = props;

	return <SidebarElementView isActive={isActive} sidebarElement={sidebarElement} />;
};

export default React.memo(SidebarElement);
