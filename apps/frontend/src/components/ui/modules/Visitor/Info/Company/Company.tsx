'use client';

import React, { useState } from 'react';

import { type CompanyPostTypes } from '@/lib/types/ui/company';

import CompanyView from './Company.view';

const Company = () => {
	const [selectedPostType, setSelectedPostType] = useState<CompanyPostTypes>('research');

	const onPostTypeChange = (PostType: CompanyPostTypes) => {
		setSelectedPostType(PostType);
	};

	return <CompanyView selectedPostType={selectedPostType} onPostTypeChange={onPostTypeChange} />;
};

export default React.memo(Company);
