import React, { useState } from 'react';

import HtmlScriptView from './HtmlScript.view';

type Props = {
	readonly onNextStep: () => void;
	readonly onPrevStep: () => void;
};

const HtmlScript = (props: Props) => {
	const [animationClass, setAnimationClass] = useState('animate-fadeIn');

	const onNextStep = () => {
		setAnimationClass('animate-fadeOut');

		setTimeout(() => {
			props.onNextStep();
		}, 500);
	};

	return <HtmlScriptView animationClass={animationClass} onNextStep={onNextStep} onPrevStep={props.onPrevStep} />;
};

export default React.memo(HtmlScript);
