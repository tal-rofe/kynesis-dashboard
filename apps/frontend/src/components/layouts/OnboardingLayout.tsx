import React from 'react';

import UIBrandLogo from '@/ui/UIBrandLogo';

import PageWrapper from '../wrappers/PageWrapper';

type PageProps = {
	readonly children: React.ReactNode;
};

const OnboardingLayout = (props: PageProps) => {
	return (
		<div className="p-12 w-full overflow-hidden h-full bg-onboarding from-neutral-200 to-neutral-200 backdrop-blur-3xl">
			<UIBrandLogo type="icon-text" className="absolute" />
			<PageWrapper>{props.children}</PageWrapper>
		</div>
	);
};

export default OnboardingLayout;
