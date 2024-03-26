'use client';

import { useEffect } from 'react';
import { useVisitorsStore } from '@/lib/store/useVisitorsStore';
import { type Visitor } from '@/lib/types/ui/visitor';
import UIVisitorsTable from '@/ui/UIVisitorsTable';
import PageWrapper from '@/wrappers/PageWrapper';

const data: Visitor[] = [
	{
		id: 'm5gr84i9',
		fullName: 'Almog Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '123123',
		fullName: 'Bear Greenholtz',
		email: 'bear@greenholtz.ltd',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
];

const Prospects = () => {
	const visitors = useVisitorsStore((state) => state.visitors);
	const setVisitors = useVisitorsStore((state) => state.setVisitors);
	const setCurrentVisitor = useVisitorsStore((state) => state.setCurrentVisitor);

	useEffect(() => {
		setVisitors(data);
		setCurrentVisitor(undefined);
	}, []);

	return (
		<PageWrapper>
			<UIVisitorsTable data={visitors} />
		</PageWrapper>
	);
};

export default Prospects;
