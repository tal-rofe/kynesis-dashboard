'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { UISwitch } from '@/ui/UISwitch';
import { UILabel } from '@/ui/UILabel';

const Settings = () => {
	const { theme, setTheme } = useTheme();

	return (
		<section>
			<div className="flex items-center gap-4">
				<UILabel>Dark mode</UILabel>
				<UISwitch checked={theme === 'dark'} onCheckedChange={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))} />
			</div>
		</section>
	);
};

export default React.memo(Settings);
