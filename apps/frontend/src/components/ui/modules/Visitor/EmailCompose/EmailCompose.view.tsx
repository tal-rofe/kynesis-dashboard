import React from 'react';
import { UIButton } from '@/ui/UIButton';
import { type Visitor } from '@/lib/types/ui/visitor';
import { UIInput } from '@/ui/UIInput';
import UISvg from '@/ui/UISvg';
import { UIAvatar, UIAvatarImage, UIAvatarFallback } from '@/ui/UIAvatar';

type Props = {
	readonly currentVisitor?: Visitor;
};

const EmailComposeView = (props: Props) => {
	return (
		<div className="flex flex-col justify-between p-8 w-1/2 h-full border-l border-gray-400 bg-accent gap-4">
			<div className="p-6 flex flex-col justify-between h-full bg-white ">
				<div className="flex flex-col h-full gap-4">
					<div className="border-b border-gray-400 flex items-center gap-4 pb-4">
						<span className="text-gray-600">To</span>
						<div className="flex items-center gap-2">
							<UIAvatar className="w-7 h-7 border">
								<UIAvatarImage src="https://github.com/shadcn.png" />
								<UIAvatarFallback>CN</UIAvatarFallback>
							</UIAvatar>
							<span className="text-gray-600">{props.currentVisitor?.fullName}</span>
						</div>
					</div>
					<span className=" text-gray-400 font-normal">{'Subject '}</span>
					<p className=" text-gray-400 font-normal">{'Generated email goes here '}</p>
				</div>
				<UIButton variant="outline" className="w-full">
					<div className="flex items-center">
						<UISvg name="copy" className="mr-2" />
						Copy to clipboard
					</div>
				</UIButton>
			</div>
			<div className="flex items-center w-full gap-2 h-11">
				<UIInput className="w-full h-full" placeholder="Prompt to edit the email..." />
				<UIButton variant="link" className="h-full bg-black hover:bg-slate-500">
					<UISvg name="arrow" />
				</UIButton>
			</div>
		</div>
	);
};

export default React.memo(EmailComposeView);
