'use client';

import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

type Props = {
	readonly isModalOpen: boolean;
	readonly showModal: (content: ReactNode) => void;
	readonly hideModal: VoidFunction;
};

const ModalContext = createContext<Props | undefined>(undefined);

export const ModalProvider: React.FC<{ readonly children: ReactNode }> = ({ children }) => {
	const [isModalOpen, seIsModalOpen] = useState<boolean>(false);
	const [content, setContent] = useState<ReactNode>(null);
	const [shouldRender, setShouldRender] = useState<boolean>(false);
	const [animationClass, setAnimationClass] = useState<string>('');

	const showModal = (content: ReactNode) => {
		setContent(content);
		seIsModalOpen(true);
		setShouldRender(true);
		setAnimationClass('animate-fadeIn');
	};

	const hideModal = () => {
		seIsModalOpen(false);
		setAnimationClass('animate-fadeOut');
		setTimeout(() => {
			setShouldRender(false);
		}, 200);
	};

	useEffect(() => {
		if (!isModalOpen && shouldRender) {
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 300);

			return () => clearTimeout(timer);
		}

		return;
	}, [isModalOpen, shouldRender]);

	return (
		<ModalContext.Provider value={{ isModalOpen, showModal, hideModal }}>
			{children}
			{shouldRender && (
				<div
					className={`fixed inset-0 z-40 flex items-center justify-center ${animationClass} transition-opacity duration-200 bg-[#3636361A]`}
					onClick={hideModal}
				>
					<div className=" flex justify-center w-full" onClick={(event) => event.stopPropagation()}>
						{content}
					</div>
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
