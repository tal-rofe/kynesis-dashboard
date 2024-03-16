'use client';

import { useState, useEffect } from 'react';

/**
 * The useScreenSize hook returns the current screen size and whether the screen is mobile or tablet.
 * @returns {object} The current screen size and whether the screen is mobile or tablet.
 */
const useScreenSize = () => {
	const [width, setWidth] = useState<number | null>(null);

	useEffect(() => {
		setWidth(window.innerWidth);

		const handleScreenChange = () => setWidth(window.innerWidth);

		window.addEventListener('resize', handleScreenChange);

		return () => {
			window.removeEventListener('resize', handleScreenChange);
		};
	}, []);

	return {
		isMobile: width !== null && width <= 400,
		isTablet: width !== null && width > 400 && width < 768,
		lg: width !== null && width >= 1024,
		md: width !== null && width < 768,
		width,
	};
};

export default useScreenSize;
