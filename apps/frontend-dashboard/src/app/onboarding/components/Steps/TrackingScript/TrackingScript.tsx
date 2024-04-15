import React, { useEffect, useState } from 'react';

import { type ScriptDomainType } from '@/lib/types/api/onboarding';
import { isValidWebsiteUrl } from '@/lib/utils/regex';

import TrackingScriptView from './TrackingScript.view';

type Props = {
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
};

const TrackingScript = (props: Props) => {
	const [animationClass, setAnimationClass] = useState('animate-fadeIn');
	const [selectedScriptDomainType, setSelectedScriptDomainType] = useState<ScriptDomainType | undefined>(undefined);
	const [websiteUrl, setWebsiteUrl] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);

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

	const onFormValidation = () => {
		if (websiteUrl && selectedScriptDomainType) {
			if (isValidWebsiteUrl(websiteUrl)) {
				setIsFormValid(true);
			} else {
				setIsFormValid(false);
			}
		} else {
			setIsFormValid(false);
		}
	};

	const onSelectScriptDomainType = (scriptDomainType: ScriptDomainType) => {
		setSelectedScriptDomainType(scriptDomainType);
	};

	const onChangeWebsiteUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWebsiteUrl(e.target.value);
	};

	const onPateWebsiteUrl = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();

		const clipboardData = e.clipboardData.getData('text');

		setWebsiteUrl(clipboardData);
	};

	useEffect(() => {
		onFormValidation();
	}, [websiteUrl, selectedScriptDomainType]);

	return (
		<TrackingScriptView
			animationClass={animationClass}
			selectedScriptDomainType={selectedScriptDomainType}
			isFormValid={isFormValid}
			websiteUrl={websiteUrl}
			onNextStep={onNextStep}
			onPrevStep={onPrevStep}
			onSelectScriptDomainType={onSelectScriptDomainType}
			onChangeWebsiteUrl={onChangeWebsiteUrl}
			onPateWebsiteUrl={onPateWebsiteUrl}
		/>
	);
};

export default React.memo(TrackingScript);
