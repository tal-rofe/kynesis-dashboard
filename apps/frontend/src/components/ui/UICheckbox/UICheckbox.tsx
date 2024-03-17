import React from 'react';

import EDCheckboxView from './UICheckbox.view';

type Props = {
	readonly checked: boolean;
	readonly onClick: VoidFunction;
};

const UICheckbox = (props: Props) => {
	return <EDCheckboxView checked={props.checked} onClick={props.onClick} />;
};

export default React.memo(UICheckbox);
