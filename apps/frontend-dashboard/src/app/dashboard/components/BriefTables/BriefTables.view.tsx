import React from 'react';

import { UICard, UICardDescription } from '@/ui/UICard';
import UISvg from '@/ui/UISvg';

const BriefTablesView = () => {
	return (
		<div className="flex flex-col items-center w-full h-full gap-6 max-w-[316px]">
			<UICard className="h-full w-full p-6 bg-background">
				<div className="flex flex-row w-full items-center justify-between mb-3">
					<UICardDescription>Top visited pages</UICardDescription>
					<UISvg name="laptop2" className="iconStroke" />
				</div>
				<div className="flex flex-col gap-3 mt-6">
					<div className="flex items-center justify-between w-full gap-3">
						<div className=" flex items-center gap-3">
							<UISvg name="globe" />
							<span className="text-secondary-foreground text-sm">https://hayota.studio/</span>
						</div>
						<span className="text-secondary-foreground text-sm font-medium">11,837</span>
					</div>
					<div className="flex items-center justify-between w-full gap-3">
						<div className=" flex items-center gap-3">
							<UISvg name="globe" />
							<span className="text-secondary-foreground text-sm">https://hayota.studio/</span>
						</div>
						<span className="text-secondary-foreground text-sm font-medium">11,837</span>
					</div>
					<div className="flex items-center justify-between w-full gap-3">
						<div className=" flex items-center gap-3">
							<UISvg name="globe" />
							<span className="text-secondary-foreground text-sm">https://hayota.studio/</span>
						</div>
						<span className="text-secondary-foreground text-sm font-medium">11,837</span>
					</div>
				</div>
			</UICard>
			<UICard className="h-full w-full p-6 bg-background">
				<div className="flex flex-row w-full items-center justify-between mb-3">
					<UICardDescription>Visitors by city</UICardDescription>
					<UISvg name="mapPin" className="iconStroke" />
				</div>
				<div className="flex flex-col gap-3 mt-6">
					<div className="flex items-center justify-between w-full gap-3">
						<span className="text-secondary-foreground text-sm">Tel Aviv</span>
						<div className=" flex items-center gap-3">
							<span className="text-secondary-foreground text-sm font-medium">11,837</span>
							<span className="text-secondary-foreground text-sm">(70%)</span>
						</div>
					</div>
					<div className="flex items-center justify-between w-full gap-3">
						<span className="text-secondary-foreground text-sm">Tel Aviv</span>
						<div className=" flex items-center gap-3">
							<span className="text-secondary-foreground text-sm font-medium">11,837</span>
							<span className="text-secondary-foreground text-sm">(70%)</span>
						</div>
					</div>
					<div className="flex items-center justify-between w-full gap-3">
						<span className="text-secondary-foreground text-sm">Tel Aviv</span>
						<div className=" flex items-center gap-3">
							<span className="text-secondary-foreground text-sm font-medium">11,837</span>
							<span className="text-secondary-foreground text-sm">(70%)</span>
						</div>
					</div>
				</div>
			</UICard>
		</div>
	);
};

export default React.memo(BriefTablesView);
