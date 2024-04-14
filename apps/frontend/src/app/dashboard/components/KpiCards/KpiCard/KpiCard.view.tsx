import React from 'react';

import type icons from '@/assets/icons';
import { UICard, UICardDescription, UICardTitle } from '@/ui/UICard';
import UISvg from '@/ui/UISvg';

type Props = {
	readonly label: string;
	readonly icon: keyof typeof icons;
	readonly title: string;
	readonly description: string;
};

const KpiCardView = (props: Props) => {
	return (
		<UICard className="h-full w-full p-6 bg-background">
			<div className="flex flex-row w-full items-center justify-between mb-3">
				<UICardDescription>{props.label}</UICardDescription>
				<UISvg name={props.icon} className="iconStroke" />
			</div>
			<div>
				<UICardTitle className="mb-1.5">{props.title}</UICardTitle>
				<UICardDescription className=" text-muted-foreground">{props.description}</UICardDescription>
			</div>
		</UICard>
	);
};

export default React.memo(KpiCardView);
