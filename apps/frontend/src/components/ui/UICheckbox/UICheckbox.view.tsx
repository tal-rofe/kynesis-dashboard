import React from 'react';

type Props = {
	readonly checked: boolean;
	readonly onClick: VoidFunction;
};

const EDCheckboxView = (props: Props) => {
	return (
		<button type="button" onClick={props.onClick}>
			{props.checked && <span>Yazif</span>}
		</button>
	);
};

export default React.memo(EDCheckboxView);
