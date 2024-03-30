import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { UIButton } from '@/ui/UIButton';
import UISvg from '@/ui/UISvg';
import { type SidebarElement } from '@/lib/types/ui/nav-element';
import { UIMenubarShortcut } from '@/ui/UIMenu';
import { cn } from '@/lib/utils/component';

type Props = {
	readonly isActive: boolean;
	readonly sidebarElement: SidebarElement;
	readonly onShowSearchModal: VoidFunction;
};

const SidebarElementView = (props: Props) => {
	const { sidebarElement } = props;

	if (sidebarElement.logout) {
		return (
			<UIButton asChild variant="ghost" className="w-full justify-start">
				<button type="button" onClick={() => signOut()}>
					<UISvg name={sidebarElement.icon} className="mr-1" />
					{sidebarElement.label}
				</button>
			</UIButton>
		);
	}

	if (!sidebarElement.link) {
		return (
			<UIButton variant="ghost" className=" w-full justify-start" onClick={props.onShowSearchModal}>
				<UISvg name={sidebarElement.icon} className="mr-1" />
				{sidebarElement.label}
				{sidebarElement.icon === 'search' && <UIMenubarShortcut>⌘K</UIMenubarShortcut>}
			</UIButton>
		);
	}

	return (
		<UIButton asChild variant="ghost" className={cn(props.isActive && 'bg-accent text-accent-foreground', 'w-full justify-start')}>
			<Link href={sidebarElement.link}>
				<UISvg name={sidebarElement.icon} className="mr-1" />
				{sidebarElement.label}
			</Link>
		</UIButton>
	);
};

export default React.memo(SidebarElementView);
