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
	readonly animationClass: string;
	readonly onNextStep: VoidFunction;
	readonly onPrevStep: VoidFunction;
};

const HtmlScriptView = (props: Props) => {
	return (
		<UICard className={cn(props.animationClass, 'w-fit max-w-[755px]')}>
			<UICardHeader>
				<UICardTitle>Installing script with HTML code</UICardTitle>
				<UICardDescription>Installing in https://domainfromearlier.com</UICardDescription>
			</UICardHeader>
			<UICardContent>
				<UIProgress value={50} />
				<div className="grid w-full items-center gap-1.5 my-4">
					<UILabel htmlFor="copy">1. Copy the tracking script</UILabel>
					<UITextarea className=" bg-slate-950 max-h-64 min-h-64 h-64 text-slate-400 text-sm font-normal font-['Menlo'] leading-tight">
						{`B2BRetention.prototype.send_to_gateway = function (event_obj, url, endpoint) {
    						if (this.has_valid_id && this.valid_geo && !this.disable_events) {
        					let u = "https://" + url + ".execute-api.us-west-2.amazonaws.com/" + endpoint;

       			 			let d = btoa(_reb2b.clean_string(JSON.stringify(event_obj)));

        					fetch(u, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: d})
    					}
						}`}
					</UITextarea>
					<UIButton variant="outline" className="w-full">
						<div className="flex items-center gap-2">
							<UISvg name="copy" />
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
					<UIButton variant="default" className="w-1/2 gap-1">
						<UISvg name="code" className="fill-transparent" />
						Test script on website
					</UIButton>
					<div className="flex items-center justify-end gap-2">
						<span className="text-muted-foreground text-sm">Script installation status:</span>
						<UIBadge className="gap-1">
							<UISvg name="verified" className=" fill-transparent" />
							Script verified
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
