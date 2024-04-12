import React from 'react';
import { TypeAnimation } from 'react-type-animation';

import { UIButton } from '@/ui/UIButton';
import { type EmailSubjects } from '@/lib/types/ui/email-subjects';
import { type Visitor } from '@/lib/types/ui/visitor';
import { UIInput } from '@/ui/UIInput';
import UISvg from '@/ui/UISvg';
import { UIAvatar, UIAvatarImage, UIAvatarFallback } from '@/ui/UIAvatar';
import { UIBadge } from '@/ui/UIBadge';
import { addEllipsis } from '@/lib/utils/text';

type Props = {
	readonly currentVisitor?: Visitor;
	readonly emailSubjects: Record<EmailSubjects, string>[] | undefined;
	readonly setEmailSubjects: (key: EmailSubjects, value: string) => void;
};

const EmailComposeView = (props: Props) => {
	const [pressed, setIsPressted] = React.useState(false);

	return (
		<div className="flex flex-col justify-between p-8 w-full h-full md:border-l border-gray-400 bg-accent gap-4 dark:bg-card ">
			<div className="p-6 flex flex-col justify-between h-full bg-background rounded-lg border">
				<div className="flex flex-col h-full gap-4">
					<div className="border-b flex items-center gap-4 pb-4">
						<span className="text-gray-600 dark:text-white">To</span>
						<div className="flex items-center gap-2">
							<UIAvatar className="w-7 h-7 border">
								<UIAvatarImage src="https://github.com/shadcn.png" />
								<UIAvatarFallback>CN</UIAvatarFallback>
							</UIAvatar>
							<span className="text-gray-600 dark:text-white">{props.currentVisitor?.fullName}</span>
						</div>
					</div>
					{!pressed && <span className=" text-gray-400 font-medium text-base">{'Subject '}</span>}
					<div className=" text-gray-400 font-normal">
						{!pressed ? (
							props.emailSubjects?.map((object) => {
								if (!object) {return null;}

								return Object.entries(object).map(([key, value]) => (
									<UIBadge className="text-xs mr-4 mb-4 font-semibold" variant="outline" key={key + '-' + value}>
										<UISvg name="x" className="mr-2 cursor-pointer " onClick={() => props.setEmailSubjects(key as EmailSubjects, value)} />
										{`${key}:`}
										&nbsp;
										<span className=" ">{addEllipsis(value, 16)}</span>
									</UIBadge>
								));
							})
						) : (
							<TypeAnimation
								sequence={[
									'Subject: Introduction to our piano building services\n\n\n',
									2000,
									'Subject: Introduction to our piano building services\n\n\nDear Bar Hen,',
									1000,
									'Subject: Introduction to our piano building services\n\n\nDear Bar Greenholtz,',
									1000,
									'Subject: Introduction to our piano building services\n\n\nDear Bear Shpichnholtz,',
									500,
									'Subject: Introduction to our piano building services\n\n\nDear Bear Shpichnholtz,\n\nI hope this message finds you well. My name is Yaara, and I am reaching out to introduce our services that could significantly benefit Music Riser. Our company specializes in building pianos, and we believe our expertise aligns perfectly with the needs and aspirations of Music Riser.',
									1000,
								]}
								wrapper="p"
								speed={65}
								className="whitespace-pre-line font-normal text-gray-400"
							/>
						)}
					</div>
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
				<UIButton variant="link" className="h-full bg-[#1E293B]" onClick={() => setIsPressted((prev) => !prev)}>
					<UISvg name="arrow" />
				</UIButton>
			</div>
		</div>
	);
};

export default React.memo(EmailComposeView);
