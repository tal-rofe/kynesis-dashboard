'use client';

import React, { useEffect, useState } from 'react';

import { type WelcomeFormInputs } from '@/lib/types/api/onboarding';
import { isValidLinkedInURL } from '@/lib/utils/regex';

import WelcomeView from './Welcome.view';

type Props = {
	readonly onNextStep: VoidFunction;
};

const Welcome = (props: Props) => {
	const [formInputs, setFormInputs] = useState<WelcomeFormInputs>({
		firstName: '',
		lastName: '',
		companyLinkedInURL: '',
	});

	const [animationClass, setAnimationClass] = useState('animate-fadeIn');

	const [isFormValid, setIsFormValid] = useState(false);

	const onFormValidation = () => {
		if (formInputs.firstName && formInputs.lastName && formInputs.companyLinkedInURL) {
			if (isValidLinkedInURL(formInputs.companyLinkedInURL)) {
				setIsFormValid(true);
			} else {
				setIsFormValid(false);
			}
		} else {
			setIsFormValid(false);
		}
	};

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

	const onNextStep = () => {
		setAnimationClass('animate-fadeOut');

		setTimeout(() => {
			props.onNextStep();
		}, 500);
	};

	useEffect(() => {
		onFormValidation();
	}, [formInputs]);

	return (
		<WelcomeView
			formInputs={formInputs}
			isFormValid={isFormValid}
			animationClass={animationClass}
			onNextStep={onNextStep}
			onInputChange={onInputChange}
			onInputPaste={onInputPaste}
		/>
	);
};

export default React.memo(Welcome);
