'use client';

import React from 'react';
import { useTheme } from 'next-themes';

import { UISwitch } from '@/ui/UISwitch';
import { UILabel } from '@/ui/UILabel';
import PageWrapper from '@/wrappers/PageWrapper';
import { useNotificationsStore } from '@/lib/store/useNotificationsStore';
import type { NotificationType } from '@/lib/types/ui/notification';
import { UIButton } from '@/ui/UIButton';

const Settings = () => {
	const { theme, setTheme } = useTheme();
	const { showNotification } = useNotificationsStore();

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const showNotificationHandler = (notificationType: NotificationType) => {
		showNotification({
			title: 'Notification title',
			content: 'Notification content for notification',
			type: notificationType,
			duration: 5000,
		});
	};

	return (
		<PageWrapper className="flex flex-col gap-4">
			<div className="flex items-center gap-4 rounded card h-fit">
				<UILabel>Night vision</UILabel>
				<UISwitch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
			</div>
			<hr className="border-gray-300" />
			<div className="flex flex-col gap-4 rounded card w-fit">
				<UIButton onClick={() => showNotificationHandler('success')}>Show Success Notification</UIButton>
				<UIButton variant="destructive" onClick={() => showNotificationHandler('error')}>
					Show Error Notification
				</UIButton>
				<UIButton className=" bg-yellow-200 hover:bg-yellow-500" onClick={() => showNotificationHandler('warning')}>
					Show Warning Notification
				</UIButton>
				<UIButton variant="secondary" onClick={() => showNotificationHandler('info')}>
					Show Info Notification
				</UIButton>
			</div>
		</PageWrapper>
	);
};

export default React.memo(Settings);
