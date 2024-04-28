import React from 'react';

const UISpinner = () => {
	return (
		<div className="flex justify-center items-center">
			<div className="relative h-3 w-3">
				<span className="absolute inset-0 rounded-full border-2 border-gray-900" />
				<span className="absolute inset-0 rounded-full border-t-2 border-gray-500 animate-spin" />
			</div>
		</div>
	);
};

export { UISpinner };
