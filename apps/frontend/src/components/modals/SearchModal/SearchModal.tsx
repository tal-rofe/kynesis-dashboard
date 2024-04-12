'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import { navElements } from '@/lib/data/nav-elements';
import { useVisitorsStore } from '@/lib/store/useVisitorsStore';

import SearchModalView from './SearchModal.view';

type Props = {
	readonly hideModal: VoidFunction;
};

const SearchModal = (props: Props) => {
	const pathname = usePathname();
	const [searchInputValue, setSearchInputValue] = useState('');
	const pages = navElements.filter((element) => element.link !== pathname);

	const visitors = useVisitorsStore((state) => state.visitors);
	const previousVisitors = useVisitorsStore((state) => state.previousVisitors);
	const setCurrentVisitor = useVisitorsStore((state) => state.setCurrentVisitor);

	const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInputValue(() => e.target.value);

	return (
		<SearchModalView
			searchInputValue={searchInputValue}
			pages={pages}
			visitors={visitors}
			previousVisitors={previousVisitors}
			hideModal={props.hideModal}
			setCurrentVisitor={setCurrentVisitor}
			onSearchInputChange={onSearchInputChange}
		/>
	);
};

export default React.memo(SearchModal);
