import { type SidebarElement } from '@/types/ui/nav-element';
import { routes } from '../routes';

export const navElements: SidebarElement[] = [
	{ label: 'Search', icon: 'search', sticky: true },
	{ label: 'Settings', icon: 'settings', link: routes.settings.path, sticky: true },
	{ label: 'Visitors', icon: 'users', link: routes.visitors.path },
	{ label: 'Prospects', icon: 'table', link: routes.prospects.path },
	{ label: 'Log Out', icon: 'logout', logout: true },
];
