'use client';

import { useEffect } from 'react';

type Props = {
	readonly error: Error & { digest?: string };
	readonly reset: () => void;
};

const Error = (props: Props) => {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(props.error);
	}, [props.error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<button
				type="button"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => props.reset()
				}
			>
				Try again
			</button>
		</div>
	);
};

export default Error;
