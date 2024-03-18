import React from 'react';
import PageWrapper from '../wrappers/PageWrapper';

type PageProps = {
	readonly children: React.ReactNode;
};

const BaseLayout = (props: PageProps) => {
	return (
		<section className="px-4 py-3">
			<PageWrapper>{props.children}</PageWrapper>
		</section>
	);
};

export default BaseLayout;
