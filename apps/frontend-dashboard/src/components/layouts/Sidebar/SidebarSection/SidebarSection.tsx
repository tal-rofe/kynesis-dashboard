import React from 'react';

import { type SidebarElement } from '@/lib/types/ui/nav-element';

import SidebarSectionView from './SidebarSection.view';

type Props = {
	readonly elements: SidebarElement[];
	readonly label?: string;
};

const SidebarSection = (props: Props) => {
	return <SidebarSectionView elements={props.elements} label={props.label} />;
};

export default React.memo(SidebarSection);
