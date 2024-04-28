import React, { useMemo, useState } from 'react';

import useBackend from '@/lib/hooks/useBackend';
import type { CompanyDescriptionRequestResponse } from '@/lib/types/api/onboarding';
import useBackendService from '@/lib/hooks/useBackendService';

import CompanyDescriptionView from './CompanyDescription.view';

type Props = {
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
};

const CompanyDescription = (props: Props) => {
	const backendService = useBackendService();

	const { data: autoFilledCompanyDescription } = useBackend<CompanyDescriptionRequestResponse>('/onboarding/company-description');
	const [animationClass, setAnimationClass] = useState('animate-fade-in');
	const [isFormAutoFilled, setIsFormAutoFilled] = useState(false);

	const [formInputs, setFormInputs] = useState<CompanyDescriptionRequestResponse>({
		company: '',
		companyDescription: '',
		productOrService: '',
	});

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

	const onInputPaste = (key: keyof CompanyDescriptionRequestResponse, e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		e.preventDefault();

		const clipboardData = e.clipboardData.getData('text');

		const newUserData = {
			...formInputs,
			[key]: clipboardData,
		};

		setFormInputs(newUserData);
	};

	const isFormValid = useMemo(() => {
		if (!formInputs.company || !formInputs.companyDescription || !formInputs.productOrService) {
			return false;
		}

		return true;
	}, [formInputs]);

	const onNextStep = async () => {
		const { ok } = await backendService.post('/onboarding/company-description', {
			body: JSON.stringify(formInputs),
		});

		if (!ok) return;

		setAnimationClass('animate-fade-out');
		props.onNextStep();
	};

	const onPrevStep = () => {
		setAnimationClass('animate-fade-out');

		setTimeout(() => {
			props.onPrevStep();
		}, 500);
	};

	const onSetAutoFill = () => {
		if (!autoFilledCompanyDescription) return;

		setFormInputs(autoFilledCompanyDescription);
		setIsFormAutoFilled(true);
	};

	return (
		<CompanyDescriptionView
			formInputs={formInputs}
			isFormValid={isFormValid}
			autoFilledCompanyDescription={autoFilledCompanyDescription}
			animationClass={animationClass}
			isFormAutoFilled={isFormAutoFilled}
			onInputChange={onInputChange}
			onInputPaste={onInputPaste}
			onNextStep={onNextStep}
			onPrevStep={onPrevStep}
			onSetAutoFill={onSetAutoFill}
		/>
	);
};

export default React.memo(CompanyDescription);
