'use client';

import React, { useState } from 'react';

import type { Notification, NotificationType } from '@/types/ui/notification';
import { cn } from '@/lib/utils/component';
import { useNotificationsStore } from '@/lib/store/useNotificationsStore';

const UINotifications = () => {
	const { notifications, unmountNotification, pauseHidingNotification, resumeHidingNotification } = useNotificationsStore();
	const [hoverStatus, setHoverStatus] = useState<Record<number, boolean>>({});

	const containerClasses = (notification: Notification) => {
		return `relative flex flex-col items-center justify-center h-14 p-4 mb-4 overflow-hidden border-l-8 rounded-lg transition-all duration-300 ease-in-out
            ${notification.isUnmounting ? 'animate-slide-out' : 'animate-slide-in'}
            ${notification.type === 'info' ? 'bg-gray-800 border-gray-700' : ''}
            ${notification.type === 'success' ? 'bg-green-100 border-green-600' : ''}
            ${notification.type === 'warning' ? 'bg-yellow-100 border-yellow-500' : ''}
            ${notification.type === 'error' ? 'bg-red-100 border-red-600' : ''}`;
	};

	const textColorClasses = (type: NotificationType) => {
		return `${type === 'info' ? 'text-gray-100' : ''}
			${type === 'success' ? 'text-green-600' : ''}
			${type === 'warning' ? 'text-yellow-500' : ''}
			${type === 'error' ? 'text-red-600' : ''}`;
	};

	const timerBackgroundClasses = (type: NotificationType, notificationId: number) => {
		const isPaused = hoverStatus[notificationId] || false;

		return `absolute inset-0 h-14 rounded-br-lg opacity-20
            ${type === 'info' ? 'bg-gray-600' : ''}
            ${type === 'success' ? 'bg-green-600' : ''}
            ${type === 'warning' ? 'bg-yellow-500' : ''}
            ${type === 'error' ? 'bg-red-600' : ''}
            animate-expand ${isPaused ? 'paused' : 'running'}`;
	};

	const handleMouseEnter = (notificationId: number) => {
		pauseHidingNotification(notificationId);
		setHoverStatus((prev) => ({ ...prev, [notificationId]: true }));
	};

	const handleMouseLeave = (notificationId: number) => {
		resumeHidingNotification(notificationId);
		setHoverStatus((prev) => ({ ...prev, [notificationId]: false }));
	};

	return (
		<div className="fixed inset-x-8 bottom-3 z-30 flex flex-col items-end">
			{notifications.map((notification) => {
				if (!notification.id) return;

				const durationInSeconds = (notification.duration || 3000) / 1000;

				return (
					<div
						key={notification.id}
						className={containerClasses(notification)}
						onMouseEnter={() => handleMouseEnter(notification.id!)}
						onMouseLeave={() => handleMouseLeave(notification.id!)}
						onClick={() => unmountNotification(notification.id!)}
					>
						<span className={cn('text-sm font-medium z-10', textColorClasses(notification.type))}>{notification.title}</span>
						<span className={cn('text-xs z-10', textColorClasses(notification.type))}>{notification.content}</span>
						<span
							className={timerBackgroundClasses(notification.type, notification.id!)}
							style={{ animationDuration: `${durationInSeconds}s` }}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default UINotifications;
