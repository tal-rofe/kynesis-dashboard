import React from 'react';
import { type SidebarElement as SidebarElementType } from '@/lib/types/ui/nav-element';
import SidebarElement from './SidebarElement';

type Props = {
	readonly elements: SidebarElementType[];
	readonly label?: string;
};
const SidebarSectionView = (props: Props) => {
	return (
		<div className="flex flex-col">
			{props.label && <h3 className="font-medium text-gray-600 mb-1 text-xs px-4">{props.label}</h3>}
			<ul className="flex flex-col">
				{props.elements.map((element, index) => (
					<li key={index}>
						<SidebarElement sidebarElement={element} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default React.memo(SidebarSectionView);
