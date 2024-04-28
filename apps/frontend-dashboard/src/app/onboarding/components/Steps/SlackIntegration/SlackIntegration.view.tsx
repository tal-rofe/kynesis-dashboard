import React from 'react';
import Image from 'next/image';
import { AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils/component';
import { UIButton } from '@/ui/UIButton';
import { UICard, UICardHeader, UICardTitle, UICardDescription, UICardContent, UICardFooter } from '@/ui/UICard';
import { UIProgress } from '@/ui/UIProgress';
import { UIDivider } from '@/ui/UIDivider';
import { UIAlert, UIAlertDescription, UIAlertTitle } from '@/ui/UIAlert';
// import UISvg from '@/ui/UISvg';

type Props = {
	readonly isSlackIntegrated: boolean;
	readonly animationClass: string;
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
	readonly onIntegrateWithSlack: VoidFunction;
};

const SlackIntegrationView = (props: Props) => {
	return (
		<UICard className={cn(props.animationClass, 'w-fit')}>
			<UICardHeader>
				<div className="flex justify-between">
					<UICardTitle className=" justify-between">Enable Slack alerts</UICardTitle>
					<UIAlert className=" w-fit h-fit py-1 px-2 flex">
						{/* <UISvg name="check" /> */}
						<UICardDescription className=" text-xs p-0">Recommended</UICardDescription>
					</UIAlert>
				</div>
				<UICardDescription>Set up Slack to get real-time alerts when prospects show buying intent</UICardDescription>
			</UICardHeader>

			<UICardContent>
				<UIProgress value={80} />
				<div className="grid w-full items-center gap-1.5 my-4">
					<UIButton
						variant="outline"
						className="whitespace-normal h-16 shadow w-full p-4 border-primary"
						onClick={props.onIntegrateWithSlack}
					>
						<div className="flex items-center h-fit text-left gap-2">
							<Image src="/images/slack-logo.png" alt="Slack logo" width={16} height={16} />
							<span className="text-slate-950 text-sm font-normal">Integrate with Slack</span>
						</div>
					</UIButton>
					<UIDivider />
					<UIAlert>
						<AlertCircle className="h-4 w-4" />
						<UIAlertTitle>What is a Slack alert?</UIAlertTitle>
						<UIAlertDescription>A Slack alert sends intent signals (real-time visitors) to your channel</UIAlertDescription>
					</UIAlert>
				</div>
				<div className="flex items-center gap-4">
					{/* <UIButton
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
							<span className="text-slate-950 text-sm font-normal">
								Script will load on only on the subdomain provided in ‘Your website’.
							</span>
						</div>
					</UIButton> */}
				</div>
			</UICardContent>
			<UICardFooter className="flex justify-between">
				<UIButton variant="outline" onClick={props.onPrevStep}>
					Back
				</UIButton>
				<div className="flex items-center gap-4">
					<UIButton variant="ghost" onClick={props.onNextStep}>
						Integrate later
					</UIButton>
					<UIButton onClick={props.onNextStep}>Next</UIButton>
				</div>
			</UICardFooter>
		</UICard>
	);
};

export default React.memo(SlackIntegrationView);
