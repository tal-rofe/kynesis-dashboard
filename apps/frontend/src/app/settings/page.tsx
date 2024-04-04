'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { UISwitch } from '@/ui/UISwitch';
import { UILabel } from '@/ui/UILabel';
import PageWrapper from '@/wrappers/PageWrapper';

const Settings = () => {
	const { theme, setTheme } = useTheme();

	return (
		<PageWrapper>
			<div className="flex items-center gap-4 rounded card buttonContainer">
				<UILabel>Dark mode</UILabel>
				<UISwitch checked={theme === 'dark'} onCheckedChange={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))} />
			</div>
		</PageWrapper>
	);
};

export default React.memo(Settings);
