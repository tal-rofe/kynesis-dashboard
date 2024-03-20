import React from 'react';

import { UICard, UICardContent, UICardDescription, UICardFooter, UICardHeader, UICardTitle } from '@/ui/UICard';
import { UIProgress } from '@/ui/UIProgress';
import { UIButton } from '@/ui/UIButton';
import { cn } from '@/lib/utils/component';
import { UITextarea } from '@/ui/UITextarea';
import { UILabel } from '@/ui/UILabel';
import UISvg from '@/ui/UISvg';

type Props = {
	readonly animationClass: string;
	readonly onNextStep: () => void;
	readonly onPrevStep: () => void;
};

const HtmlScriptView = (props: Props) => {
	return (
		<UICard className={cn(props.animationClass, 'w-fit')}>
			<UICardHeader>
				<UICardTitle>Installing script with HTML code</UICardTitle>
				<UICardDescription>Installing in https://domainfromearlier.com</UICardDescription>
			</UICardHeader>
			<UICardContent>
				<UIProgress value={75} />
				<div className="grid w-full items-center gap-1.5 my-4">
					<UILabel htmlFor="copy">1. Copy the tracking script</UILabel>
					<UITextarea className=" bg-slate-950 w-[780px]  max-h-64 min-h-64 h-64  text-slate-400 text-sm font-normal font-['Menlo'] leading-tight">
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
				<div className="flex flex-col gap-2">
					<UILabel htmlFor="copy">2. Install script in website code</UILabel>
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
