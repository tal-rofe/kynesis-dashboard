import React from 'react';

import { navElements } from '@/lib/data/nav-elements';
import SidebarView from './Sidebar.view';

const Sidebar = () => {
	const sidebarElements = navElements.filter((element) => !element.sticky && !element.logout);
	const stickySidebarElements = navElements.filter((element) => element.sticky && !element.logout);
	const logoutSidebarElements = navElements.filter((element) => element.logout);

	return <SidebarView sidebarElements={sidebarElements} stickySidebarElements={stickySidebarElements} logoutSidebarElements={logoutSidebarElements} />;
};

export default React.memo(Sidebar);
