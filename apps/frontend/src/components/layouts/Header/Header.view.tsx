import React from 'react';
import { type SidebarElement } from '@/lib/types/ui/nav-element';
import UISvg from '@/ui/UISvg';

type Props = {
	readonly currentPage?: SidebarElement;
};

const HeaderView = (props: Props) => {
	if (!props.currentPage) return null;

	return (
		<header className="flex items-center w-full border-b border-gray-400 dark:border-gray-700 py-6 px-8 max-h-20 h-full gap-2">
			<UISvg name={props.currentPage.icon} className="h-6 w-6" />
			<h1 className="text-xl font-semibold">{props.currentPage.label}</h1>
		</header>
	);
};

export default React.memo(HeaderView);
