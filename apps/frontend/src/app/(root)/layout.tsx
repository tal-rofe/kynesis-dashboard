import { redirect } from 'next/navigation';
import { routes } from '@/lib/routes';

const RootLayout = () => {
	redirect(routes.visitors.path);
};

export default RootLayout;
