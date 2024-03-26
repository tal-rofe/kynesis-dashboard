import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type Visitor } from '@/lib/types/ui/visitor';
import { type EmailSubjects } from '@/lib/types/ui/email-subjects';
import { UICard, UICardHeader, UICardTitle, UICardContent } from '@/ui/UICard';
import { UICheckbox } from '@/ui/UICheckbox';
import workHistoryPlaceholder from '@/public/images/work-history-placeholder.png';
import UISvg from '@/ui/UISvg';
import { useVisitorsStore } from '@/lib/store/useVisitorsStore';

type Props = {
	readonly currentVisitor?: Visitor;
	readonly emailSubjects?: Record<EmailSubjects, string>[];
	readonly setEmailSubjects: (key: EmailSubjects, value: string) => void;
};

type WorkHistory = {
	readonly companyName: string;
	readonly position: string;
};

const WorkHistoryCard = (props: WorkHistory) => {
	const emailSubjects = useVisitorsStore((state) => state.emailSubjects);
	const setEmailSubjects = useVisitorsStore((state) => state.setEmailSubjects);

	return (
		<div className="flex items-center justify-between h-full">
			<div className="flex gap-4">
				<Image src={workHistoryPlaceholder} alt="work history placeholder" className=" h-10 w-auto" />
				<div className="flex flex-col">
					<div className="text-sm">{props.companyName}</div>
					<div className="text-secondary-foreground text-sm">{props.position}</div>
					<span className="text-secondary-foreground text-sm">/ Current</span>
				</div>
			</div>
			<UICheckbox
				checked={!!emailSubjects?.find((subject) => subject['work'] === props.companyName)}
				onCheckedChange={() => setEmailSubjects('work', props.companyName)}
			/>
		</div>
	);
};

const IntroView = (props: Props) => {
	return (
		<UICard className="flex flex-col w-full border rounded-lg shadow">
			<UICardHeader className="flex flex-row items-start justify-between border-b">
				<div className="flex flex-col justify-start gap-1.5">
					<div className="flex items-center gap-2">
						<UICardTitle>{props.currentVisitor?.fullName}</UICardTitle>
						<UISvg name="linkedinLogo" />
					</div>
					<span className="text-sm">
						Treasury Analyst at&nbsp;
						<Link className="text-blue-600" href="https://linkedin.com/company/zim">
							Yazif.io
						</Link>
					</span>
				</div>
				<div className="flex flex-col justify-end gap-1.5">
					<div className="text-secondary-foreground text-sm text-end">{`${props.currentVisitor?.city}, ${props.currentVisitor?.country}`}</div>
					<div className="text-secondary-foreground  text-sm text-end">Mar 22, 2024 04:13 PM</div>
				</div>
			</UICardHeader>
			<div className="flex">
				<div className="flex flex-col w-1/2">
					<UICardHeader className="flex flex-row items-center border-b ">
						<div className="flex flex-col">
							<UICardTitle>Contact information</UICardTitle>
						</div>
					</UICardHeader>
					<UICardContent className="pt-4">
						<div className="flex flex-col gap-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="h-10 w-10 flex items-center justify-center border rounded-full">
										<UISvg name="mail" className=" fill-primary" />
									</div>
									<div className="flex flex-col">
										<span className=" text-blue-600">{props.currentVisitor?.email}</span>
										<span>Primary • Business</span>
									</div>
								</div>
								<UICheckbox checked className=" rounded-full" />
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="flex items-center justify-center h-10 w-10 border rounded-full">
										<UISvg name="phone" className=" fill-primary" />
									</div>
									<div className="flex flex-col">
										<span className=" text-blue-600">0501231234</span>
										<span>Primary • Business</span>
									</div>
								</div>
								{/* <UICheckbox checked /> */}
							</div>
						</div>
					</UICardContent>
				</div>

				<div className="flex flex-col w-1/2  border-l">
					<UICardHeader className="flex flex-row items-center border-b">
						<div className="flex flex-col !mt-0">
							<UICardTitle>Work history</UICardTitle>
						</div>
					</UICardHeader>
					<UICardContent className="flex flex-col gap-2 py-4 px-6 overflow-y-auto h-44">
						<WorkHistoryCard companyName="Yazif.io" position="Software Engineer" />
						<WorkHistoryCard companyName="Zim.io" position="Software Engineer" />
						<WorkHistoryCard companyName="Zim.com" position="Software Engineer" />
						<WorkHistoryCard companyName="Yazif.io" position="Software Engineer" />
						<WorkHistoryCard companyName="Yazif.io" position="Software Engineer" />
					</UICardContent>
				</div>
			</div>
		</UICard>
	);
};

export default React.memo(IntroView);
