import React from 'react';
import { type SidebarElement } from '@/lib/types/ui/nav-element';
import { type Visitor } from '@/lib/types/ui/visitor';
import UISvg from '@/ui/UISvg';
import { UIButton } from '@/ui/UIButton';

type Props = {
	readonly currentVisitor?: Visitor;
	readonly currentPage?: SidebarElement;
	readonly onNavBack?: VoidFunction;
};

const HeaderView = (props: Props) => {
	if (!props.currentPage) return null;

	return (
		<header className="flex items-center w-full border-b border-gray-400 dark:border-gray-700 py-6 px-8 max-h-20 h-full gap-2">
			<UISvg name={props.currentPage.icon} className="h-6 w-6" />
			<h1 className="text-xl font-semibold">{props.currentPage.label}</h1>
			{props.currentVisitor && (
				<>
					<span className="mx-2">/</span>
					<span className="font-normal">{`${props.currentVisitor.fullName}`}</span>
					<UIButton className=" ml-auto flex items-center gap-2" variant="ghost" onClick={props.onNavBack}>
						<UISvg name="chevron" />
						<span>Back to table</span>
					</UIButton>
				</>
			)}
		</header>
	);
};

export default React.memo(HeaderView);
