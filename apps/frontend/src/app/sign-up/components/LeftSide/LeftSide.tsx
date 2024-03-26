import React from 'react';

import UIBrandLogo from '@/ui/UIBrandLogo';

const LeftSide = () => {
	return (
		<section className="flex flex-col justify-between w-6/12 min-w-[630px]">
			<div className="pt-12 pl-12">
				<UIBrandLogo type="icon-text" />
			</div>
			<div className="flex flex-col pb-12 pl-12 text-primary-foreground text-xl font-normal whitespace-nowrap">
				<span>Discover the power of intelligent prospecting.</span>
				<span>Kynesis.io transforms website visits into deep, actionable insights,</span>
				<span>fueling targeted and effective sales strategies.</span>
			</div>
		</section>
	);
};

export default React.memo(LeftSide);
