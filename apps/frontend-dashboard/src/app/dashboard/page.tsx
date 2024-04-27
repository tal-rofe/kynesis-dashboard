'use client';
import React, { useEffect } from 'react';

import { useVisitorsStore } from '@/lib/store/useVisitorsStore';
import UIVisitorsTable from '@/ui/UIVisitorsTable';
import PageWrapper from '@/wrappers/PageWrapper';
import { VisitorsMock } from '@/lib/data/mock/visitors';

import KpiCards from './components/KpiCards';
import BriefTables from './components/BriefTables';

const Visitors = () => {
	const visitors = useVisitorsStore((state) => state.visitors);
	const setVisitors = useVisitorsStore((state) => state.setVisitors);
	const setCurrentVisitor = useVisitorsStore((state) => state.setCurrentVisitor);

	useEffect(() => {
		setVisitors(VisitorsMock);
		setCurrentVisitor(undefined);
	}, []);

	return (
		<PageWrapper className="flex flex-col h-screen gap-8">
			<KpiCards />
			<div className="flex flex-1 overflow-hidden gap-8">
				<div className="flex flex-col w-full h-full p-6 bg-background rounded-lg border">
					<UIVisitorsTable tableId="dashboard" data={visitors} dataOnly />
				</div>
				<BriefTables />
			</div>
		</PageWrapper>
	);
};

export default React.memo(Visitors);
