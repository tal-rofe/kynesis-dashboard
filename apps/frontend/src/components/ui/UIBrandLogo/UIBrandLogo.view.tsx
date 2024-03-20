import React from 'react';

import { cn } from '@/lib/utils/component';
import UISvg from '../UISvg';

type Props = {
	readonly type: 'icon' | 'text' | 'icon-text';
	readonly className?: string;
	readonly onClick?: VoidFunction;
};

const BrandIcon = () => {
	return <UISvg name="brandLogoIcon" className="!h-[51px] !w-[51px] fill-transparent" />;
};

const BrandText = () => {
	return <UISvg name="brandLogoText" className="!w-40 !h-full" />;
};

const UIBrandLogoView = (props: Props) => {
	const clickHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		props.onClick!();
	};

	if (props.onClick) {
		return (
			<button className={cn(props.className, 'flex items-center gap-[6px] h-[53px]')} type="button" onClick={clickHandler}>
				<BrandIcon />
				<BrandText />
			</button>
		);
	}

	if (props.type === 'icon-text') {
		return (
			<div className={cn(props.className, 'flex items-center gap-[6px] h-[53px]')}>
				<BrandIcon />
				<BrandText />
			</div>
		);
	}

	return (
		<>
			{props.type === 'text' && <BrandIcon />}
			{props.type === 'icon' && <BrandText />}
		</>
	);
};

export default React.memo(UIBrandLogoView);
