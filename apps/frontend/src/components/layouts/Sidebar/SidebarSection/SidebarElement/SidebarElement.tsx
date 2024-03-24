'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { useModal } from '@/lib/providers/ModalProvider';
import SearchModal from '@/modals/SearchModal';
import { type SidebarElement as SidebarElementType } from '@/lib/types/ui/nav-element';
import SidebarElementView from './SidebarElement.view';

type Props = {
	readonly sidebarElement: SidebarElementType;
};

const SidebarElement = (props: Props) => {
	const { showModal } = useModal();
	const pathname = usePathname();

	const isActive = pathname === props.sidebarElement.link;

	const { sidebarElement } = props;

	const onShowSearchModal = () => {
		showModal(<SearchModal />);
	};

	return <SidebarElementView isActive={isActive} sidebarElement={sidebarElement} onShowSearchModal={onShowSearchModal} />;
};

export default React.memo(SidebarElement);
