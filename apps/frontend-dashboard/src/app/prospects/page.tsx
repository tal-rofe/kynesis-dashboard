'use client';

import { useEffect } from 'react';

import { useVisitorsStore } from '@/lib/store/useVisitorsStore';
import UIVisitorsTable from '@/ui/UIVisitorsTable';
import PageWrapper from '@/wrappers/PageWrapper';
import { VisitorsMock } from '@/lib/data/mock/visitors';

const Prospects = () => {
	const visitors = useVisitorsStore((state) => state.visitors);
	const setVisitors = useVisitorsStore((state) => state.setVisitors);
	const setCurrentVisitor = useVisitorsStore((state) => state.setCurrentVisitor);

	useEffect(() => {
		setVisitors(VisitorsMock);
		setCurrentVisitor(undefined);
	}, []);

	return (
		<PageWrapper>
			<UIVisitorsTable data={visitors} />
		</PageWrapper>
	);
};

export default Prospects;
