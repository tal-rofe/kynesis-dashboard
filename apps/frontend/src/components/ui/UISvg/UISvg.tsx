import React, { type CSSProperties } from 'react';

import type icons from '@/public/icons';

import UISvgView from './UISvg.view';

type Props = {
	readonly name: keyof typeof icons;
	readonly className?: string;
	readonly style?: CSSProperties;
	readonly onClick?: VoidFunction;
};

const USvg = (props: Props) => {
	return <UISvgView style={props.style} className={props.className} name={props.name} onClick={props.onClick} />;
};

export default React.memo(USvg);
