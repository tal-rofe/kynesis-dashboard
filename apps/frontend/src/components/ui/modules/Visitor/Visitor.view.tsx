import React from 'react';
import EmailCompose from './EmailCompose';

const VisitorView = () => {
	return (
		<div className="flex items-center w-full h-full">
			<div className="w-1/2 h-full">amir</div>
			<EmailCompose />
		</div>
	);
};

export default React.memo(VisitorView);
