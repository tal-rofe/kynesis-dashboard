import React from 'react';

import { navElements } from '@/lib/data/nav-elements';
import SidebarView from './Sidebar.view';

const Sidebar = () => {
	const stickySidebarElements = navElements.filter((element) => element.sticky);
	const sidebarElements = navElements.filter((element) => !element.sticky);

	return <SidebarView sidebarElements={sidebarElements} stickySidebarElements={stickySidebarElements} />;
};

export default React.memo(Sidebar);
