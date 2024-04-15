import React from 'react';

import PageTransitionWrapper from '@/wrappers/PageTransitionWrapper';
import { ModalProvider } from '@/lib/providers/ModalProvider';

import Sidebar from './Sidebar';
import Header from './Header';

type PageProps = {
	readonly children: React.ReactNode;
	readonly sidebar?: boolean;
	readonly header?: boolean;
};

const BaseLayout = (props: PageProps) => {
	return (
		<ModalProvider>
			<section className="flex items-start w-full h-full overflow-hidden">
				{props.sidebar && <Sidebar />}
				<div className="flex flex-col w-full h-full">
					{props.header && <Header />}

					<PageTransitionWrapper>{props.children}</PageTransitionWrapper>
				</div>
			</section>
		</ModalProvider>
	);
};

export default BaseLayout;
