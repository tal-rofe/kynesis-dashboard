import BaseLayout from '@/layouts/BaseLayout';

type Props = {
	readonly children: React.ReactNode;
};

export const metadata = {
	title: 'Not Found',
	description: 'This page could not be found',
};

const RootLayout = (props: Props) => {
	return <BaseLayout>{props.children}</BaseLayout>;
};

export default RootLayout;
