import { type RoutesPath } from '@/lib/routes';
import type icons from '@/public/icons';

export type SidebarElement = {
	readonly label: string;
	readonly icon: keyof typeof icons;
	readonly position?: 'top' | 'bottom';
	readonly link?: RoutesPath;
};
