import React from 'react';

import { cn } from '@/lib/utils/component';

import UISvg from '../UISvg';

type Props = {
	readonly type: 'icon' | 'text' | 'icon-text';
	readonly className?: string;
	readonly onClick?: VoidFunction;
};

const UIBrandLogoView = (props: Props) => {
	const clickHandler = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		props.onClick!();
	};

	const brandIcon = <UISvg name="brandLogoIcon" className="!h-[51px] !w-[51px] fill-transparent" />;
	const brandText = <UISvg name="brandLogoText" className="!w-40 !h-full fill-[#222222]" />;

	if (props.onClick) {
		return (
			<button className={cn(props.className, 'flex items-center gap-[6px] h-[53px]')} type="button" onClick={clickHandler}>
				{brandIcon}
				{brandText}
			</button>
		);
	}

	if (props.type === 'icon-text') {
		return (
			<div className={cn(props.className, 'flex items-center gap-[6px] h-[53px]')}>
				{brandIcon}
				{brandText}
			</div>
		);
	}

	return (
		<>
			{props.type === 'text' && brandIcon}
			{props.type === 'icon' && brandText}
		</>
	);
};

export default React.memo(UIBrandLogoView);
