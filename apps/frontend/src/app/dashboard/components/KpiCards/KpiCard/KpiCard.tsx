import React from 'react';

import type icons from '@/assets/icons';

import KpiCardView from './KpiCard.view';

type Props = {
	readonly label: string;
	readonly icon: keyof typeof icons;
	readonly title: string;
	readonly description: string;
};

const KpiCard = (props: Props) => {
	return <KpiCardView label={props.label} icon={props.icon} title={props.title} description={props.description} />;
};

export default React.memo(KpiCard);
