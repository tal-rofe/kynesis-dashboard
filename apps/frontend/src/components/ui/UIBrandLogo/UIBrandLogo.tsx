import React from 'react';

import UIBrandLogoView from './UIBrandLogo.view';

type Props = {
	readonly type: 'icon' | 'text' | 'icon-text';
	readonly className?: string;
	readonly onClick?: VoidFunction;
};

const USvg = (props: Props) => {
	return <UIBrandLogoView className={props.className} type={props.type} onClick={props.onClick} />;
};

export default React.memo(USvg);
