'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * The hook receives the initial visibility and returns an object to use for visibility control
 * @param initialIsVisible the initial visibility
 * @param delay - Optional. Time in milliseconds to delay the hiding of the element. Useful for implementing a fade-out animation.
 * @returns an object of ref, visible state and toggle visibility to use
 */
export const useClickOutside = <T extends HTMLElement>(initialIsVisible: boolean, delay?: number) => {
	const ref = useRef<T>(null);
	const [isVisibleState, setIsVisibleState] = useState<boolean>(initialIsVisible);
	const [isUnmounting, setIsUnmounting] = useState<boolean>(false);

	const toggleVisibility = () => {
		if (delay && isVisibleState) {
			setIsUnmounting(true);
			setTimeout(() => {
				setIsVisibleState((prev) => !prev);
				setIsUnmounting(false);
			}, delay);
		} else {
			setIsVisibleState((prev) => !prev);
			setIsUnmounting(false);
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			if (delay) {
				setIsUnmounting(true);
				setTimeout(() => {
					setIsVisibleState(false);
					setIsUnmounting(false);
				}, delay);
			} else {
				setIsVisibleState(false);
			}
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	return { ref, isVisible: isVisibleState, toggleVisibility, isUnmounting };
};
