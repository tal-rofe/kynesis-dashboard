import React from 'react';
import EmailCompose from './EmailCompose';

const VisitorView = () => {
	return (
		<div className="flex items-center w-full h-full">
			<div className="w-1/2 h-full px-8 py-6">amir</div>
			<EmailCompose />
		</div>
	);
};

export default React.memo(VisitorView);
