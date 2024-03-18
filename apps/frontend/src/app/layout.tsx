import type { Metadata } from 'next';

import '../styles/globals.css';

import AppWrapper from '@/wrappers/AppWrapper';

type Props = {
	readonly children: React.ReactNode;
};

export const metadata: Metadata = {
	title: 'Kynesis.io',
	description: 'Kynesis.io - The home of Kynesis',
};

const RootLayout = (props: Props) => {
	return <AppWrapper>{props.children}</AppWrapper>;
};

export default RootLayout;
