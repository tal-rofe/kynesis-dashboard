import React, { useMemo, useState } from 'react';

import type { TrackingScriptResponse, ScriptDomainType } from '@/lib/types/api/onboarding';
import { isValidWebsiteUrl } from '@/lib/utils/regex';
import useBackendService from '@/lib/hooks/useBackendService';
import { generatePixelTrackingScript } from '@/lib/utils/generate-pixel-script';

import TrackingScriptView from './TrackingScript.view';

type Props = {
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
	readonly onSetTrackingScript: (trackingScript: string) => void;
};

const TrackingScript = (props: Props) => {
	const backendService = useBackendService();

	const [animationClass, setAnimationClass] = useState('animate-fade-in');
	const [selectedScriptDomainType, setSelectedScriptDomainType] = useState<ScriptDomainType | undefined>(undefined);
	const [websiteUrl, setWebsiteUrl] = useState('');

	const isFormValid = useMemo(() => {
		if (!websiteUrl || !selectedScriptDomainType) {
			return false;
		}

		return isValidWebsiteUrl(websiteUrl);
	}, [websiteUrl, selectedScriptDomainType]);

	const onNextStep = async () => {
		const { ok } = await backendService.post<TrackingScriptResponse>('/onboarding/tracking-script', {
			data: {
				websiteUrl,
				scriptDomainType: selectedScriptDomainType,
			},
		});

		if (!ok) return;

		const trackingScript = generatePixelTrackingScript(websiteUrl, selectedScriptDomainType!);

		props.onSetTrackingScript(trackingScript);

		setAnimationClass('animate-fade-out');
		props.onNextStep();
	};

	const onPrevStep = () => {
		setAnimationClass('animate-fade-out');

		setTimeout(() => {
			props.onPrevStep();
		}, 500);
	};

	const onSelectScriptDomainType = (scriptDomainType: ScriptDomainType) => setSelectedScriptDomainType(scriptDomainType);

	const onChangeWebsiteUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWebsiteUrl(e.target.value);
	};

	const onPateWebsiteUrl = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();

		const clipboardData = e.clipboardData.getData('text');

		setWebsiteUrl(clipboardData);
	};

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
