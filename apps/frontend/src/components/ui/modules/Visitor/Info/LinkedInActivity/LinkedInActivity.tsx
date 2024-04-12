'use client';

import React, { useState } from 'react';

import { type ActivityTypes } from '@/lib/types/ui/linkedin-activity';

import LinkedInActivityView from './LinkedInActivity.view';

const LinkedInActivity = () => {
	const [selectedActivityType, setSelectedActivityType] = useState<ActivityTypes>('post');

	const onActivityTypeChange = (activityType: ActivityTypes) => {
		setSelectedActivityType(activityType);
	};

	return <LinkedInActivityView selectedActivityType={selectedActivityType} onActivityTypeChange={onActivityTypeChange} />;
};

export default React.memo(LinkedInActivity);
