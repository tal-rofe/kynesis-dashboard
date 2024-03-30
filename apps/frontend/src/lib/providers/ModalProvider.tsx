'use client';

import React, { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react';

type Props = {
	readonly isModalOpen: boolean;
	readonly showModal: (content: ReactNode) => void;
	readonly hideModal: VoidFunction;
};

const ModalContext = createContext<Props | undefined>(undefined);

export const ModalProvider: React.FC<{ readonly children: ReactNode }> = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [content, setContent] = useState<ReactNode>(null);
	const [shouldRender, setShouldRender] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement>(null);

	const showModal = (content: ReactNode) => {
		setContent(content);
		setIsModalOpen(true);
		setShouldRender(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
		setTimeout(() => {
			setShouldRender(false);
		}, 200);
	};

	useEffect(() => {
		const focusableModalElements = modalRef.current
			? Array.from(modalRef.current.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'))
			: [];

		const firstElement = focusableModalElements[0] as HTMLElement | undefined;

		if (isModalOpen && firstElement) firstElement.focus();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') hideModal();

			if (['Tab', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
				e.preventDefault();
				e.stopPropagation();

				const currentIndex = focusableModalElements.indexOf(document.activeElement as HTMLElement);
				let nextIndex = currentIndex;

				if (e.key === 'Tab' && e.shiftKey) {
					nextIndex = currentIndex - 1;
				} else if (e.key === 'Tab' && !e.shiftKey) {
					nextIndex = currentIndex + 1;
				} else if (e.key === 'ArrowDown') {
					nextIndex = currentIndex + 1;
				} else if (e.key === 'ArrowUp') {
					nextIndex = currentIndex - 1;
				}

				if (nextIndex >= focusableModalElements.length) {
					nextIndex = 0;
				} else if (nextIndex < 0) {
					nextIndex = focusableModalElements.length - 1;
				}

				(focusableModalElements[nextIndex] as HTMLElement)?.focus();
			}

			if (e.key === 'Enter') {
				const activeElement = document.activeElement;

				if (activeElement && (activeElement.tagName === 'BUTTON' || activeElement.tagName === 'A')) {
					(activeElement as HTMLButtonElement | HTMLAnchorElement).click();
					hideModal();
				}
			}
		};

		if (isModalOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isModalOpen, content]);

	return (
		<ModalContext.Provider value={{ isModalOpen, showModal, hideModal }}>
			{children}
			{shouldRender && (
				<div
					ref={modalRef}
					className={`fixed pt-32 inset-0 z-40 flex items-start justify-center ${
						isModalOpen ? 'animate-fadeIn' : 'animate-fadeOut'
					} transition-opacity duration-200 bg-[#3636361A]`}
					onClick={hideModal}
				>
					{content}
				</div>
			)}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);

	if (context === undefined) {
		throw new Error('useModal must be used within a ModalProvider');
	}

	return context;
};
