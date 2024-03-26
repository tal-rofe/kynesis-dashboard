'use client';
import React, { useEffect } from 'react';

import { type Visitor } from '@/lib/types/ui/visitor';

import { useVisitorsStore } from '@/lib/store/useVisitorsStore';
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
		fullName: 'Dozi Aharon',
		email: 'doza@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '12312ds3',
		fullName: 'Bear Aharon',
		email: 'mogi@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '12312sd3',
		fullName: 'Bar Aharon',
		email: 'misteralmog@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '123asd123',
		fullName: 'Yazif Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '123asd123',
		fullName: 'Yazif Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '123asd123',
		fullName: 'Yazif Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '123asd123',
		fullName: 'Yazif Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '123asd123',
		fullName: 'Yazif Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '123asd123',
		fullName: 'Yazif Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '123asd123',
		fullName: 'Yazif Aharon',
		email: 'almogi107@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
	{
		id: '123asd123',
		fullName: 'Yazif Aharon',
		email: 'amir.benshi@gmail.com',
		status: 'success',
		priority: 'medium',
		country: 'israel',
		city: 'tel aviv',
		gender: 'male',
	},
];

const Visitors = () => {
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

export default React.memo(Visitors);
