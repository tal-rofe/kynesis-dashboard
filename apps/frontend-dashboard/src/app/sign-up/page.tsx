import React from 'react';

import useBackendService from '@/lib/hooks/useBackendService';

import RightSide from './components/LeftSide';
import LeftSide from './components/RightSide';

const SignUp = () => {
	const x = useBackendService();

	x;

	return (
		<div className="flex h-screen">
			<RightSide />
			<LeftSide />
		</div>
	);
};

export default React.memo(SignUp);
