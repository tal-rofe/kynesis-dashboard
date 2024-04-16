import { redirect } from 'next/navigation';

import { routes } from '@/lib/routes';

const RootLayout = () => {
	redirect(routes.dashboard.path);
};

export default RootLayout;
