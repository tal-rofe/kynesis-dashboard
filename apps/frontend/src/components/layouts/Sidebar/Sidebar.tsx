'use client';

import React, { useEffect } from 'react';

import { useModal } from 'src/components/contexts/ModalContext';
import SearchModal from '@/modals/SearchModal';
import { navElements } from '@/lib/data/nav-elements';
import SidebarView from './Sidebar.view';

const Sidebar = () => {
	const { isModalOpen, showModal, hideModal } = useModal();
	const stickySidebarElements = navElements.filter((element) => element.sticky);
	const sidebarElements = navElements.filter((element) => !element.sticky);

	const toggleModal = () => {
		if (isModalOpen) {
			hideModal();
		} else {
			showModal(<SearchModal />);
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

	return <SidebarView sidebarElements={sidebarElements} stickySidebarElements={stickySidebarElements} />;
};

export default React.memo(Sidebar);
