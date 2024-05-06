import type { Metadata } from 'next';

import AppWrapper from '@/wrappers/AppWrapper';
import ThemeProvider from '@/providers/ThemeProvider';
import AuthSessionProvider from '@/lib/providers/AuthSessionProvider';
import UINotifications from '@/ui/UINotifications';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
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
					<UINotifications />
				</ThemeProvider>
			</AppWrapper>
		</AuthSessionProvider>
	);
};

export default RootLayout;
