import { type routes } from '../routes';

type Routes = typeof routes;

type Route = {
	readonly path: string;
	readonly title: string;
	readonly isRequiredAuth?: boolean;
};

// Creating the RoutesPath type by mapping and extracting the path
export type RoutesPath = {
	[K in keyof Routes]: Routes[K] extends Route ? Routes[K]['path'] : never;
}[keyof Routes];
