import React from 'react';
import PageWrapper from '../wrappers/PageWrapper';

type PageProps = {
	readonly children: React.ReactNode;
};

const BaseLayout = (props: PageProps) => {
	return (
		<div className="w-full h-full bg-gradient-to-b from-neutral-200 to-neutral-200 backdrop-blur-3xl">
			<PageWrapper>{props.children}</PageWrapper>
		</div>
	);
};

export default BaseLayout;
