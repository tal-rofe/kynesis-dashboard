import React from 'react';
import Image from 'next/image';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { type ActivityTypes } from '@/lib/types/ui/linkedin-activity';
import { UITabs, UITabsList, UITabsContent } from '@/ui/UITabs';
import { UICard, UICardContent, UICardHeader, UICardTitle } from '@/ui/UICard';
import { UISwitch } from '@/ui/UISwitch';
import workHistoryPlaceholder from '@/public/images/work-history-placeholder.png';
import UISvg from '@/ui/UISvg';
import { UICheckbox } from '@/ui/UICheckbox';
import { linkedinActivitiesMock } from '@/lib/data/mock/linkedin-activity';
import { cn } from '@/lib/utils/component';
import { useVisitorsStore } from '@/lib/store/useVisitorsStore';
import { addEllipsis } from '@/lib/utils/text';

type Props = {
	readonly selectedActivityType: ActivityTypes;
	readonly onActivityTypeChange: (activityType: ActivityTypes) => void;
};

type ActivityCardProps = {
	readonly image?: string;
	readonly content: string;
	readonly postedDate: Date;
	readonly postedByName?: string;
	readonly postedByLink?: string;
	readonly link: string;
	readonly activityType: ActivityTypes;
};

const ActivityCard = (props: ActivityCardProps) => {
	const setEmailSubjects = useVisitorsStore((state) => state.setEmailSubjects);
	const emailSubjects = useVisitorsStore((state) => state.emailSubjects);

	return (
		<div className="flex items-center justify-between gap-2  py-2 px-6 border rounded-xl  max-h-28 h-28 w-full">
			<div className="flex flex-col gap-1 justify-center">
				<div className="flex items-center gap-2">
					<span>Posted * 3h</span>
					<UISvg name="arrow" className=" fill-muted-foreground" />
				</div>
				<div className="flex h-full items-center gap-2 ">
					<Image src={props.image ?? workHistoryPlaceholder} alt="work history placeholder" className="h-[49px] w-auto" />
					<span>{addEllipsis(props.content, 150)}</span>
				</div>
			</div>
			<UICheckbox
				checked={!!emailSubjects?.find((subject) => subject[props.activityType] === props.content)}
				onCheckedChange={() => setEmailSubjects(props.activityType, props.content)}
			/>
		</div>
	);
};

const LinkedInActivityView = (props: Props) => {
	return (
		<UICard className="flex flex-col w-full border rounded-lg shadow">
			<UICardHeader>
				<UICardTitle>LinkedIn Activity</UICardTitle>
			</UICardHeader>

			<UICardContent className="p-0">
				<UITabs defaultValue="post" className="w-full">
					<div className="p-6 pt-0">
						<UITabsList className="flex items-center justify-evenly w-full">
							<TabsTrigger
								className={cn(props.selectedActivityType === 'post' && 'bg-white')}
								value="post"
								onClick={() => props.onActivityTypeChange('post')}
							>
								Recent posts
							</TabsTrigger>
							<TabsTrigger
								className={cn(props.selectedActivityType === 'comment' && 'bg-white')}
								value="comment"
								onClick={() => props.onActivityTypeChange('comment')}
							>
								Recent comments
							</TabsTrigger>
							<TabsTrigger
								className={cn(props.selectedActivityType === 'reaction' && 'bg-white')}
								value="reaction"
								onClick={() => props.onActivityTypeChange('reaction')}
							>
								Recent reactions
							</TabsTrigger>
						</UITabsList>
					</div>

					<div className="flex flex-col gap-3 mt-4  border-t">
						<div className="flex items-center gap-2 px-6 pt-3 ">
							<UISwitch />
							<span>Related to my company</span>
						</div>
						<UITabsContent value={props.selectedActivityType} className="flex flex-col overflow-y-auto h-80 gap-4 px-6">
							{linkedinActivitiesMock
								.filter((activity) => activity.activityType === props.selectedActivityType)
								.map((activity) => (
									<ActivityCard
										key={activity.id}
										content={activity.content}
										postedDate={activity.postedDate}
										link={activity.link}
										postedByName={activity.postedByName}
										activityType={activity.activityType}
									/>
								))}
						</UITabsContent>
					</div>
				</UITabs>
			</UICardContent>
		</UICard>
	);
};

export default React.memo(LinkedInActivityView);
