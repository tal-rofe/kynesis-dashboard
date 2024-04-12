'use client';

import React, { useEffect } from 'react';

import { useModal } from '@/lib/providers/ModalProvider';
import SearchModal from '@/modals/SearchModal';
import { navElements } from '@/lib/data/nav-elements';

import SidebarView from './Sidebar.view';

const Sidebar = () => {
	const { isModalOpen, showModal, hideModal } = useModal();
	const middleSidebarElements = navElements.filter((element) => !element.position);
	const topSidebarElements = navElements.filter((element) => element.position === 'top');
	const bottomSidebarElements = navElements.filter((element) => element.position === 'bottom');

	const toggleModal = () => {
		if (isModalOpen) {
			hideModal();
		} else {
			showModal(<SearchModal hideModal={hideModal} />);
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				toggleModal();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isModalOpen]);

	return (
		<SidebarView
			middleSidebarElements={middleSidebarElements}
			topSidebarElements={topSidebarElements}
			bottomSidebarElements={bottomSidebarElements}
		/>
	);
};

export default React.memo(Sidebar);
