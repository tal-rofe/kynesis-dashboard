import React from 'react';

import { type ScriptDomainType } from '@/lib/types/api/onboarding';
import { UICard, UICardContent, UICardDescription, UICardFooter, UICardHeader, UICardTitle } from '@/ui/UICard';
import { UIProgress } from '@/ui/UIProgress';
import { UIButton } from '@/ui/UIButton';
import { cn } from '@/lib/utils/component';
import { UILabel } from '@/ui/UILabel';
import { UIInput } from '@/ui/UIInput';

type Props = {
	readonly animationClass: string;
	readonly selectedScriptDomainType: ScriptDomainType | undefined;
	readonly isFormValid: boolean;
	readonly websiteUrl: string;
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
	readonly onSelectScriptDomainType: (scriptDomainType: ScriptDomainType) => void;
	readonly onChangeWebsiteUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readonly onPateWebsiteUrl: (e: React.ClipboardEvent<HTMLInputElement>) => void;
};

const TrackingScriptView = (props: Props) => {
	return (
		<UICard className={cn(props.animationClass, 'w-fit')}>
			<UICardHeader>
				<UICardTitle>Install tracking script 🚀 </UICardTitle>
				<UICardDescription>Choose the configuration for tracking visitors on your website</UICardDescription>
			</UICardHeader>
			<UICardContent>
				<UIProgress value={25} />
				<div className="grid w-full items-center gap-1.5 my-4">
					<UILabel htmlFor="websiteUrl">Your website</UILabel>
					<UIInput
						type="text"
						id="websiteUrl"
						name="websiteUrl"
						placeholder="https://domainfromearlier.com"
						value={props.websiteUrl}
						onPaste={props.onPateWebsiteUrl}
						onChange={props.onChangeWebsiteUrl}
					/>
				</div>
				<div className="flex items-center gap-4">
					<UIButton
						variant="outline"
						className={cn(
							props.selectedScriptDomainType === 'everySubDomain' ? 'border-green-500' : '',
							'whitespace-normal h-fit shadow w-full p-4',
						)}
						onClick={() => props.onSelectScriptDomainType('everySubDomain')}
					>
						<div className="flex flex-col max-w-72 h-fit text-left gap-1">
							<div className="text-slate-950 text-sm font-semibold font-['Inter'] leading-tight">Load on every subdomain</div>
							<span className="text-slate-950 text-sm font-normal">Script will load on www.acmeinc.com, app.acmeinc.com, etc.</span>
						</div>
					</UIButton>
					<UIButton
						variant="outline"
						className={cn(
							props.selectedScriptDomainType === 'specificSubDomain' ? 'border-green-500' : '',
							'whitespace-normal h-fit shadow w-full p-4',
						)}
						onClick={() => props.onSelectScriptDomainType('specificSubDomain')}
					>
						<div className="flex flex-col max-w-72 text-left gap-1">
							<div className="text-slate-950 text-sm font-semibold font-['Inter'] leading-tight">Load on a specific subdomain</div>
							<span className="text-slate-950 text-sm font-normal">Script will load on only on the subdomain provided in ‘Your website’.</span>
						</div>
					</UIButton>
				</div>
			</UICardContent>
			<UICardFooter className="flex justify-between">
				<UIButton variant="outline" onClick={props.onPrevStep}>
					Back
				</UIButton>
				<UIButton disabled={!props.isFormValid} onClick={props.onNextStep}>
					Next
				</UIButton>
			</UICardFooter>
		</UICard>
	);
};

export default React.memo(TrackingScriptView);
