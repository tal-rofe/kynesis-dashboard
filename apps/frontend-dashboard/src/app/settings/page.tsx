'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';

import { UISwitch } from '@/ui/UISwitch';
import { UILabel } from '@/ui/UILabel';
import PageWrapper from '@/wrappers/PageWrapper';
import { useNotificationsStore } from '@/lib/store/useNotificationsStore';
import type { NotificationType } from '@/lib/types/ui/notification';
import { UIButton } from '@/ui/UIButton';
import useBackendService from '@/lib/hooks/useBackendService';
import type { GoogleSheetsCreateRequest, GoogleSheetsCreateResponse, GoogleSheetsUpdateRequest } from '@/lib/types/api/google-sheets';

const Settings = () => {
	const { theme, setTheme } = useTheme();
	const backendService = useBackendService();
	const { showNotification } = useNotificationsStore();
	const [spreadsheetId, setSpreadsheetId] = useState<GoogleSheetsCreateResponse['spreadsheetId']>(null);

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

	const createSheet = async () => {
		const request: GoogleSheetsCreateRequest = {
			spreadSheetTitle: 'Antonio yazif',
			accessEmail: 'amir@kynesis.io',
		};

		const { data } = await backendService.post<GoogleSheetsCreateResponse>('/google-sheets/create', {
			body: JSON.stringify(request),
		});

		if (!data) return;

		setSpreadsheetId(data.spreadsheetId);
	};

	const updateSheet = async () => {
		if (!spreadsheetId) return;

		const request: GoogleSheetsUpdateRequest = {
			range: 'Sheet1!A1:B2',
			values: [
				['First Name', 'Last Name'],
				['Yazif', 'Anton'],
			],
		};

		await backendService.post(`/google-sheets/update/${spreadsheetId}`, {
			body: JSON.stringify(request),
		});
	};

	const deleteSheet = async () => {
		if (!spreadsheetId) return;

		await backendService.delete(`/google-sheets/delete/${spreadsheetId}`);
		setSpreadsheetId(null);
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

			<div className="flex items-center gap-4 rounded card h-fit">
				<UIButton onClick={createSheet}>Create Sheet</UIButton>
				<UIButton variant="secondary" disabled={!spreadsheetId} onClick={updateSheet}>
					Update Sheet
				</UIButton>
				<UIButton variant="destructive" disabled={!spreadsheetId} onClick={deleteSheet}>
					Delete Sheet
				</UIButton>
			</div>
		</PageWrapper>
	);
};

export default React.memo(Settings);
