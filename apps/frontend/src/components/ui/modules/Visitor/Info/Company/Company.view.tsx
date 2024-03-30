import React from 'react';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { type CompanyPostTypes } from '@/lib/types/ui/company';
import { UICard, UICardHeader, UICardTitle, UICardContent } from '@/ui/UICard';
import { UITabs, UITabsList } from '@/ui/UITabs';
import { cn } from '@/lib/utils/component';

type Props = {
	readonly selectedPostType: CompanyPostTypes;
	readonly onPostTypeChange: (postType: CompanyPostTypes) => void;
};

const CompanyView = (props: Props) => {
	return (
		<UICard className="flex flex-col w-full border rounded-lg shadow">
			<UICardHeader>
				<UICardTitle>Company</UICardTitle>
			</UICardHeader>

			<UICardContent>
				<UITabs defaultValue="research" className="w-full">
					<UITabsList className="flex items-center w-full p-[5px]">
						<TabsTrigger
							value="research"
							className={cn(props.selectedPostType === 'research' && 'bg-background', 'w-full rounded h-full')}
							onClick={() => props.onPostTypeChange('research')}
						>
							Research
						</TabsTrigger>
						<TabsTrigger
							value="relatedLeads"
							className={cn(props.selectedPostType === 'relatedLeads' && 'bg-background', 'w-full rounded h-full')}
							onClick={() => props.onPostTypeChange('relatedLeads')}
						>
							Related leads
						</TabsTrigger>
					</UITabsList>
					{/* <div className="flex flex-col py-3 px-6 gap-3 mt-4">
						<div className="flex items-center gap-2">
							<UISwitch />
							<span>Related to my company</span>
						</div>
						<UITabsContent value="research">Make changes to your account here.</UITabsContent>
						<UITabsContent value="relatedLeads">Change your password here.</UITabsContent>
					</div> */}
				</UITabs>
			</UICardContent>
		</UICard>
	);
};

export default React.memo(CompanyView);
