import type { Metadata } from 'next';

import '../styles/globals.css';

import AppWrapper from '@/wrappers/AppWrapper';

import ThemeProvider from '@/providers/ThemeProvider';

type Props = {
	readonly children: React.ReactNode;
};

export const metadata: Metadata = {
	title: 'Kynesis.io',
	description: 'Kynesis.io - The home of Kynesis',
};

const RootLayout = (props: Props) => {
	return (
		<AppWrapper>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{props.children}
			</ThemeProvider>
		</AppWrapper>
	);
};

export default RootLayout;
