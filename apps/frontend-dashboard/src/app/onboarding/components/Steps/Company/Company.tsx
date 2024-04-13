import React, { useState } from 'react';

import CompanyView from './Company.view';

type Props = {
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
};

const Company = (props: Props) => {
	const [animationClass, setAnimationClass] = useState('animate-fadeIn');

	const onNextStep = () => {
		setAnimationClass('animate-fadeOut');

		setTimeout(() => {
			props.onNextStep();
		}, 500);
	};

	const onPrevStep = () => {
		setAnimationClass('animate-fadeOut');

		setTimeout(() => {
			props.onPrevStep();
		}, 500);
	};

	return <CompanyView animationClass={animationClass} onNextStep={onNextStep} onPrevStep={onPrevStep} />;
};

export default React.memo(Company);
