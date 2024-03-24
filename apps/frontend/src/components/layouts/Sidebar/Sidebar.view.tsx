import React from 'react';
import { UIAvatar, UIAvatarFallback, UIAvatarImage } from '@/ui/UIAvatar';
import { type SidebarElement } from '@/lib/types/ui/nav-element';
import SidebarSection from './SidebarSection';

type Props = {
	readonly stickySidebarElements: SidebarElement[];
	readonly sidebarElements: SidebarElement[];
};

const SidebarView = (props: Props) => {
	return (
		<div className="bg-white dark:bg-black z-10 flex flex-col max-w-60  w-full border-r border-gray-400 dark:border-gray-700 h-full ">
			<div className="flex items-center justify-start p-4 max-h-20 h-full border-b border-gray-400 dark:border-gray-700 mb-4 gap-4">
				<UIAvatar className="w-7 h-7 border">
					<UIAvatarImage src="https://github.com/shadcn.png" />
					<UIAvatarFallback>CN</UIAvatarFallback>
				</UIAvatar>
				<div className="flex flex-col">
					<span className="text-gray-600 text-sm font-semibold leading-tight">Organization</span>
					<span className="text-gray-600 text-xs">31 Contacts</span>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<SidebarSection elements={props.stickySidebarElements} />
				<SidebarSection label="Data tables" elements={props.sidebarElements} />
			</div>
		</div>
	);
};

export default React.memo(SidebarView);
