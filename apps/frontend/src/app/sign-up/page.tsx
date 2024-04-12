import React from 'react';

import RightSide from './components/LeftSide';
import LeftSide from './components/RightSide';

const SignUp = () => {
	return (
		<div className="flex h-screen">
			<RightSide />
			<LeftSide />
		</div>
	);
};

export default React.memo(SignUp);
