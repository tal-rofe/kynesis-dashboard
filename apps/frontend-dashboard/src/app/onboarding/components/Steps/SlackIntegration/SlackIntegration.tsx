import React, { useState } from 'react';

import useBackendService from '@/lib/hooks/useBackendService';

import SlackIntegrationView from './SlackIntegration.view';

type Props = {
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
};

const SlackIntegration = (props: Props) => {
	const backendService = useBackendService();

	const [animationClass, setAnimationClass] = useState('animate-fade-in');
	const [isSlackIntegrated, setIsSlackIntegrated] = useState(false);

	const onNextStep = () => {
		setAnimationClass('animate-fade-out');
		props.onNextStep();
	};

	const onPrevStep = () => {
		setAnimationClass('animate-fade-out');

		setTimeout(() => {
			props.onPrevStep();
		}, 500);
	};

	const onIntegrateWithSlack = async () => {
		const { ok } = await backendService.post('/onboarding/slack-integration');

		if (!ok) return;

		setIsSlackIntegrated(true);
	};

	return (
		<SlackIntegrationView
			animationClass={animationClass}
			isSlackIntegrated={isSlackIntegrated}
			onNextStep={onNextStep}
			onPrevStep={onPrevStep}
			onIntegrateWithSlack={onIntegrateWithSlack}
		/>
	);
};

export default React.memo(SlackIntegration);
