import React from 'react';

import Steps from './components/Steps';

const Onboarding = () => {
	return (
		<div className="flex items-center justify-center h-full w-full">
			<Steps />
		</div>
	);
};

export default React.memo(Onboarding);
