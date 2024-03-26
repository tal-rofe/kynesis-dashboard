import React from 'react';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { UICard, UICardHeader, UICardTitle, UICardContent } from '@/ui/UICard';
import { UITabs, UITabsList } from '@/ui/UITabs';

const CompanyView = () => {
	return (
		<UICard className="flex flex-col w-full border rounded-lg shadow">
			<UICardHeader>
				<UICardTitle>Company</UICardTitle>
			</UICardHeader>

			<UICardContent>
				<UITabs defaultValue="account" className="w-full">
					<UITabsList className="flex items-center justify-evenly w-full">
						<TabsTrigger value="research">Research</TabsTrigger>
						<TabsTrigger value="relatedLeads">Related leads</TabsTrigger>
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
