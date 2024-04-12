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
	const { showModal, hideModal } = useModal();
	const pathname = usePathname();

	const isActive = pathname.includes(props.sidebarElement.link ?? '');

	const onShowSearchModal = () => {
		showModal(<SearchModal hideModal={hideModal} />);
	};

	return <SidebarElementView isActive={isActive} sidebarElement={props.sidebarElement} onShowSearchModal={onShowSearchModal} />;
};

export default React.memo(SidebarElement);
