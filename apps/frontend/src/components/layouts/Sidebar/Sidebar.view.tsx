import React from 'react';
import { UIAvatar, UIAvatarFallback, UIAvatarImage } from '@/ui/UIAvatar';
import { type SidebarElement } from '@/lib/types/ui/nav-element';
import SidebarSection from './SidebarSection';

type Props = {
	readonly sidebarElements: SidebarElement[];
	readonly stickySidebarElements: SidebarElement[];
	readonly logoutSidebarElements: SidebarElement[];
};

const SidebarView = (props: Props) => {
	return (
		<div className="flex flex-col transition-all duration-500 ease-in-out md:max-w-44 lg:max-w-52 xl:max-w-60  w-full border-r border-gray-400 dark:border-gray-700 h-full ">
			<div className="flex items-center justify-start p-4 max-h-20 h-full border-b border-gray-400 dark:border-gray-700 mb-4 gap-4">
				<UIAvatar className="w-7 h-7 border">
					<UIAvatarImage src="https://github.com/shadcn.png" />
					<UIAvatarFallback>CN</UIAvatarFallback>
				</UIAvatar>
				<div className="flex flex-col">
					<span className="text-gray-600 dark:text-white text-sm font-semibold leading-tight">Organization</span>
					<span className="text-gray-600 dark:text-white text-xs">31 Contacts</span>
				</div>
			</div>
			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-col gap-4">
					<SidebarSection elements={props.stickySidebarElements} />
					<SidebarSection label="Data tables" elements={props.sidebarElements} />
				</div>
				<div className="flex flex-col">
					<SidebarSection elements={props.logoutSidebarElements} />
				</div>
			</div>
		</div>
	);
};

export default React.memo(SidebarView);
