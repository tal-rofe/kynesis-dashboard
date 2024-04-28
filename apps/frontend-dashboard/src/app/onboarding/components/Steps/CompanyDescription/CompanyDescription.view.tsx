/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import { UICard, UICardContent, UICardDescription, UICardFooter, UICardHeader, UICardTitle } from '@/ui/UICard';
import { UIProgress } from '@/ui/UIProgress';
import UISvg from '@/ui/UISvg';
import { UIButton } from '@/ui/UIButton';
import { cn } from '@/lib/utils/component';
import { UITextarea } from '@/ui/UITextarea';
import { UILabel } from '@/ui/UILabel';
import { UIInput } from '@/ui/UIInput';
import type { CompanyDescriptionRequestResponse } from '@/lib/types/api/onboarding';

type Props = {
	readonly formInputs: CompanyDescriptionRequestResponse;
	readonly isFormValid: boolean;
	readonly autoFilledCompanyDescription?: CompanyDescriptionRequestResponse;
	readonly animationClass: string;
	readonly isFormAutoFilled: boolean;
	readonly onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	readonly onInputPaste: (key: keyof CompanyDescriptionRequestResponse, e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
	readonly onSetAutoFill: VoidFunction;
};

const CompanyDescriptionView = (props: Props) => {
	return (
		<UICard className={cn(props.animationClass, 'w-fit')}>
			<UICardHeader>
				<UICardTitle>Company Description 💼</UICardTitle>
				<UICardDescription>Share your company's details for enhanced AI email personalization</UICardDescription>
			</UICardHeader>
			<UICardContent className="max-h-[55vh] overflow-y-auto">
				<UIProgress value={75} />
				<div className="flex items-center gap-2 my-4 min-h-12">
					<UISvg name="wand" />
					{props.isFormAutoFilled ? (
						<span className="text-slate-950 text-sm font-medium font-['Inter'] leading-tight">Here’s what our AI found:</span>
					) : (
						<UIButton
							disabled={!props.autoFilledCompanyDescription}
							className="text-primary-500 bg-purple-600 hover:bg-purple-800 text-white"
							onClick={props.onSetAutoFill}
						>
							Autofill
						</UIButton>
					)}
				</div>
				<div className="grid w-full items-center gap-1.5">
					<UILabel htmlFor="lastName">Company</UILabel>
					<UIInput
						type="text"
						name="company"
						placeholder="Company Name"
						value={props.formInputs.company}
						onPaste={(e) => props.onInputPaste('company', e)}
						onChange={props.onInputChange}
					/>
				</div>
				<div className="grid w-full items-center gap-1.5 my-4">
					<UILabel htmlFor="firstName">Company description</UILabel>
					<UITextarea
						name="companyDescription"
						placeholder="Type your message here"
						value={props.formInputs.companyDescription}
						onPaste={(e) => props.onInputPaste('companyDescription', e)}
						onChange={props.onInputChange}
					/>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<UILabel htmlFor="firstName">Product or service</UILabel>
					<UITextarea
						name="productOrService"
						placeholder="Enter your company’s product or service description"
						value={props.formInputs.productOrService}
						onPaste={(e) => props.onInputPaste('productOrService', e)}
						onChange={props.onInputChange}
					/>
				</div>
			</UICardContent>
			<UICardFooter className="flex justify-between">
				<UIButton variant="outline" onClick={props.onPrevStep}>
					Back
				</UIButton>
				<UIButton onClick={props.onNextStep}>Next</UIButton>
			</UICardFooter>
		</UICard>
	);
};

export default React.memo(CompanyDescriptionView);
