import React from 'react';
import Intro from './Intro';
import LinkedInActivity from './LinkedInActivity';
import Company from './Company';

const InfoView = () => {
	return (
		<div className="flex flex-col w-1/2 h-full overflow-hidden">
			<div className="flex flex-col overflow-y-auto px-8 py-6 gap-8">
				<Intro />
				<LinkedInActivity />
				<Company />
			</div>
		</div>
	);
};

export default React.memo(InfoView);
