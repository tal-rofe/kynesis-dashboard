'use client';

import React, { useMemo, useState } from 'react';

import { type WelcomeFormInputs } from '@/lib/types/api/onboarding';
import { isValidLinkedInURL } from '@/lib/utils/regex';
import useBackendService from '@/hooks/useBackendService';

import WelcomeView from './Welcome.view';

type Props = {
	readonly onNextStep: VoidFunction;
};

const Welcome = (props: Props) => {
	const backendService = useBackendService();

	const [isLoading, setIsLoading] = useState(false);

	const [formInputs, setFormInputs] = useState<WelcomeFormInputs>({
		firstName: 'Amir',
		lastName: 'Ben',
		companyLinkedInURL: 'https://www.linkedin.com/company/microsoft/',
	});

	const [animationClass, setAnimationClass] = useState('animate-fade-in');

	const isFormValid = useMemo(() => {
		if (!formInputs.firstName || !formInputs.lastName || !formInputs.companyLinkedInURL) {
			return false;
		}

		return isValidLinkedInURL(formInputs.companyLinkedInURL);
	}, [formInputs]);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (!Object.keys(formInputs).includes(name)) {
			return;
		}

		const newUserData = {
			...formInputs,
			[name]: value,
		};

		setFormInputs(newUserData);
	};

	const onInputPaste = (key: keyof WelcomeFormInputs, e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();

		const clipboardData = e.clipboardData.getData('text');

		const newUserData = {
			...formInputs,
			[key]: clipboardData,
		};

		setFormInputs(newUserData);
	};

	const onNextStep = async () => {
		setIsLoading(true);
		const { ok } = await backendService.post('/onboarding/welcome', {
			body: JSON.stringify(formInputs),
		});

		if (!ok) {
			setIsLoading(false);

			return;
		}

		setIsLoading(false);
		setAnimationClass('animate-fade-out');
		props.onNextStep();
	};

	return (
		<WelcomeView
			formInputs={formInputs}
			isFormValid={isFormValid}
			animationClass={animationClass}
			isLoading={isLoading}
			onNextStep={onNextStep}
			onInputChange={onInputChange}
			onInputPaste={onInputPaste}
		/>
	);
};

export default React.memo(Welcome);
