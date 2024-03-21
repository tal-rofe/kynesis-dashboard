import React from 'react';
import { type WelcomeFormInputs } from '@/lib/types/api/onboarding';
import { UICard, UICardContent, UICardDescription, UICardFooter, UICardHeader, UICardTitle } from '@/ui/UICard';
import { UIProgress } from '@/ui/UIProgress';
import { UIInput } from '@/ui/UIInput';
import { UILabel } from '@/ui/UILabel';
import { UIButton } from '@/ui/UIButton';
import { cn } from '@/lib/utils/component';

type Props = {
	readonly formInputs: WelcomeFormInputs;
	readonly isFormValid: boolean;
	readonly animationClass: string;
	readonly onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readonly onInputPaste: (key: keyof WelcomeFormInputs, e: React.ClipboardEvent<HTMLInputElement>) => void;
	readonly onNextStep: () => void;
};

const WelcomeView = (props: Props) => {
	return (
		<UICard className={cn(props.animationClass, 'w-fit')}>
			<UICardHeader>
				<UICardTitle>Welcome to Kynesis.io 🎉</UICardTitle>
				<UICardDescription>Let’s get you quickly set up.</UICardDescription>
			</UICardHeader>
			<UICardContent>
				<UIProgress value={0} />
				<div className="flex items-center gap-4 my-4">
					<div className="grid w-full max-w-sm items-center gap-1.5">
						<UILabel htmlFor="firstName">First Name</UILabel>
						<UIInput
							type="text"
							id="firstName"
							name="firstName"
							placeholder="John"
							value={props.formInputs.firstName}
							onPaste={(e) => props.onInputPaste('firstName', e)}
							onChange={props.onInputChange}
						/>
					</div>
					<div className="grid w-full max-w-sm items-center gap-1.5">
						<UILabel htmlFor="lastName">Last Name</UILabel>
						<UIInput
							type="text"
							id="lastName"
							name="lastName"
							placeholder="Smith"
							value={props.formInputs.lastName}
							onPaste={(e) => props.onInputPaste('lastName', e)}
							onChange={props.onInputChange}
						/>
					</div>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<UILabel htmlFor="companyLinkedInURL">What is your company’s LinkedIn URL?</UILabel>
					<UIInput
						type="text"
						id="companyLink"
						name="companyLinkedInURL"
						placeholder="https://www.linkedin.com/company/your-company"
						value={props.formInputs.companyLinkedInURL}
						onPaste={(e) => props.onInputPaste('companyLinkedInURL', e)}
						onChange={props.onInputChange}
					/>
				</div>
			</UICardContent>
			<UICardFooter className="flex justify-end">
				<UIButton disabled={!props.isFormValid} onClick={props.onNextStep}>
					Next
				</UIButton>
			</UICardFooter>
		</UICard>
	);
};

export default React.memo(WelcomeView);
