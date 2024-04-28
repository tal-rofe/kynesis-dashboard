import React from 'react';

import { UICard, UICardContent, UICardDescription, UICardFooter, UICardHeader, UICardTitle } from '@/ui/UICard';
import { UIProgress } from '@/ui/UIProgress';
import { UIButton } from '@/ui/UIButton';
import { cn } from '@/lib/utils/component';
import { UITextarea } from '@/ui/UITextarea';
import { UILabel } from '@/ui/UILabel';
import UISvg from '@/ui/UISvg';
import { UIBadge } from '@/ui/UIBadge';

type Props = {
	readonly trackingScript: string;
	readonly animationClass: string;
	readonly isCopied: boolean;
	readonly isTrackingScriptVerified: boolean;
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
	readonly onCopyTrackingScriptToClipboard: VoidFunction;
	readonly onVerifyTrackingScript: VoidFunction;
};

const HtmlScriptView = (props: Props) => {
	return (
		<UICard className={cn(props.animationClass, 'w-fit max-w-[755px]')}>
			<UICardHeader>
				<UICardTitle>Installing script with HTML code</UICardTitle>
				<UICardDescription>Installing in https://domainfromearlier.com</UICardDescription>
			</UICardHeader>
			<UICardContent className=" max-h-[55vh] overflow-y-auto">
				<UIProgress value={50} />
				<div className="grid w-full items-center gap-1.5 my-4">
					<UILabel htmlFor="copy">1. Copy the tracking script</UILabel>
					<UITextarea className=" bg-slate-950 max-h-56 min-h-56 h-56 text-slate-400 text-sm font-normal font-['Menlo'] leading-tight">
						{props.trackingScript}
					</UITextarea>
					<UIButton variant="outline" className="w-full" disabled={props.isCopied} onClick={props.onCopyTrackingScriptToClipboard}>
						<div className="flex items-center gap-2">
							<UISvg name={props.isCopied ? 'check' : 'copy'} />
							<span>Copy script</span>
						</div>
					</UIButton>
				</div>
				<div className="flex flex-col gap-2 my-5">
					<UILabel htmlFor="copy">2. Install script in website code</UILabel>
					<span className="text-muted-foreground text-sm">{'Place the code in the <header> of your website.'}</span>
				</div>
				<div className="flex flex-col gap-2">
					<UILabel htmlFor="copy">3. Test script</UILabel>
					<span className="text-muted-foreground text-sm">
						This is to verify that the script is live and firing properly by opening a window to your website. If the tracker is correctly
						installed, the popup will auto close and success message will be displayed.
					</span>
				</div>
				<div className="flex items-center justify-between mt-4">
					<UIButton variant="default" className="w-1/2 gap-1" onClick={props.onVerifyTrackingScript}>
						<UISvg name="code" className="fill-transparent" />
						Test script on website
					</UIButton>
					<div className="flex items-center justify-end gap-2">
						<span className="text-muted-foreground text-sm">Script installation status:</span>
						<UIBadge variant={props.isTrackingScriptVerified ? 'default' : 'destructive'} className="gap-1">
							<UISvg name="verified" className="fill-transparent" />
							{`Script ${props.isTrackingScriptVerified ? 'verified' : 'not verified'}`}
						</UIBadge>
					</div>
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

export default React.memo(HtmlScriptView);
