import React, { useState } from 'react';

import useBackendService from '@/lib/hooks/useBackendService';

import HtmlScriptView from './HtmlScript.view';

type Props = {
	readonly trackingScript: string;
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
};

const HtmlScript = (props: Props) => {
	const backendService = useBackendService();

	const [animationClass, setAnimationClass] = useState('animate-fade-in');
	const [isCopied, setIsCopied] = useState(false);
	const [isTrackingScriptVerified, setIsTrackingScriptVerified] = useState(false);

	const onNextStep = () => {
		setAnimationClass('animate-fade-out');

		setTimeout(() => {
			props.onNextStep();
		}, 500);
	};

	const onCopyTrackingScriptToClipboard = () => {
		navigator.clipboard.writeText(props.trackingScript);
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 3000);
	};

	const onVerifyTrackingScript = async () => {
		const { ok } = await backendService.get('/onboarding/tracking-script/ping-tracking-script');

		if (!ok) return;

		setIsTrackingScriptVerified(true);
	};

	return (
		<HtmlScriptView
			trackingScript={props.trackingScript}
			animationClass={animationClass}
			isCopied={isCopied}
			isTrackingScriptVerified={isTrackingScriptVerified}
			onNextStep={onNextStep}
			onPrevStep={props.onPrevStep}
			onCopyTrackingScriptToClipboard={onCopyTrackingScriptToClipboard}
			onVerifyTrackingScript={onVerifyTrackingScript}
		/>
	);
};

export default React.memo(HtmlScript);
