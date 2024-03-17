import React from 'react';
import PageWrapper from '../wrappers/PageWrapper';

type PageProps = {
	readonly children: React.ReactNode;
};

const BaseLayout = (props: PageProps) => {
	return (
		<section>
			<PageWrapper>{props.children}</PageWrapper>
		</section>
	);
};

export default BaseLayout;
