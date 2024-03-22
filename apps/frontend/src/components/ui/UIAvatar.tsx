'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils/component';

const UIAvatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Root ref={ref} className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} {...props} />
	),
);

UIAvatar.displayName = AvatarPrimitive.Root.displayName;

const UIAvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(
	({ className, ...props }, ref) => <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />,
);

UIAvatarImage.displayName = AvatarPrimitive.Image.displayName;

const UIAvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Fallback ref={ref} className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)} {...props} />
	),
);

UIAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { UIAvatar, UIAvatarImage, UIAvatarFallback };
