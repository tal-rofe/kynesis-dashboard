import type { Metadata } from 'next';

import AppWrapper from '@/wrappers/AppWrapper';
import ThemeProvider from '@/providers/ThemeProvider';
import AuthSessionProvider from '@/lib/providers/AuthSessionProvider';

import '../styles/globals.css';

type Props = {
	readonly children: React.ReactNode;
};

export const metadata: Metadata = {
	title: 'Kynesis.io',
	description: 'Kynesis.io - The home of Kynesis',
};

const RootLayout = (props: Props) => {
	return (
		<AuthSessionProvider>
			<AppWrapper>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{props.children}
				</ThemeProvider>
			</AppWrapper>
		</AuthSessionProvider>
	);
};

export default RootLayout;
