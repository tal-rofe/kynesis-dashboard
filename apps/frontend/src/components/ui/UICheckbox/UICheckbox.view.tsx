import React from 'react';

import classes from './UICheckbox.module.scss';

type Props = {
	readonly checked: boolean;
	readonly onClick: VoidFunction;
};

const EDCheckboxView = (props: Props) => {
	return (
		<button className={props.checked ? classes['container'] : classes['container--unchecked']} type="button" onClick={props.onClick}>
			{props.checked && <span>Yazif</span>}
		</button>
	);
};

export default React.memo(EDCheckboxView);
