import { type RoutesPath } from '@/lib/routes';
import type icons from '@/public/icons';

export type SidebarElement = {
	readonly label: string;
	readonly icon: keyof typeof icons;
	readonly link?: RoutesPath;
	readonly sticky?: boolean;
	readonly logout?: boolean;
};
