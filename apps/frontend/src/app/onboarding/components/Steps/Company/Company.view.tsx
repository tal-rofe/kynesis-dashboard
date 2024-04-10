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

type Props = {
	readonly animationClass: string;
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
};

const CompanyView = (props: Props) => {
	return (
		<UICard className={cn(props.animationClass, 'w-fit')}>
			<UICardHeader>
				<UICardTitle>Company Description 💼</UICardTitle>
				<UICardDescription>Share your company's details for enhanced AI email personalization</UICardDescription>
			</UICardHeader>
			<UICardContent>
				<UIProgress value={75} />
				<div className="flex items-center gap-2 my-4">
					<UISvg name="wand" />
					<span className="text-slate-950 text-sm font-medium font-['Inter'] leading-tight">Here’s what our AI found:</span>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<UILabel htmlFor="lastName">Company</UILabel>
					<UIInput type="text" id="company" name="company" placeholder="Company Name" />
				</div>
				<div className="grid w-full items-center gap-1.5 my-4">
					<UILabel htmlFor="firstName">Company description</UILabel>
					<UITextarea placeholder="Type your message here" />
				</div>
				<div className="grid w-full items-center gap-1.5">
					<UILabel htmlFor="firstName">Company description</UILabel>
					<UITextarea placeholder="Type your message here" />
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

export default React.memo(CompanyView);
