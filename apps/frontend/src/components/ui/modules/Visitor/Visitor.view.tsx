import React from 'react';
import EmailCompose from './EmailCompose';
import Info from './Info';

const VisitorView = () => {
	return (
		<div className="flex items-center w-full h-svh overflow-hidden max-h-[calc(100%-5rem)]">
			<Info />
			<EmailCompose />
		</div>
	);
};

export default React.memo(VisitorView);
