import { type SidebarElement } from '@/types/ui/nav-element';

import { routes } from '../routes';

export const navElements: SidebarElement[] = [
	{ label: 'Search', icon: 'search', position: 'top' },
	{ label: 'Dashboard', icon: 'layoutDashboard', link: routes.dashboard.path, position: 'top' },
	{ label: 'Settings', icon: 'settings', link: routes.settings.path, position: 'top' },
	{ label: 'Visitors', icon: 'users', link: routes.visitors.path },
	{ label: 'Prospects', icon: 'table', link: routes.prospects.path },
	{ label: 'Log Out', icon: 'logout', position: 'bottom' },
];
