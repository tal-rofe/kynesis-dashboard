/* eslint-disable max-lines */
'use client';

import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';

import { cn } from '@/lib/utils/component';

const UIMenubarMenu = MenubarPrimitive.Menu;

const UIMenubarGroup = MenubarPrimitive.Group;

const UIMenubarPortal = MenubarPrimitive.Portal;

const UIMenubarSub = MenubarPrimitive.Sub;

const UIMenubarRadioGroup = MenubarPrimitive.RadioGroup;

const UIMenubar = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>>(
	({ className, ...props }, ref) => (
		<MenubarPrimitive.Root ref={ref} className={cn('flex h-10 items-center space-x-1 rounded-md border bg-background p-1', className)} {...props} />
	),
);

UIMenubar.displayName = MenubarPrimitive.Root.displayName;

const UIMenubarTrigger = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>>(
	({ className, ...props }, ref) => (
		<MenubarPrimitive.Trigger
			ref={ref}
			className={cn(
				'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
				className,
			)}
			{...props}
		/>
	),
);

UIMenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const UIMenubarSubTrigger = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
		readonly inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<MenubarPrimitive.SubTrigger
		ref={ref}
		className={cn(
			'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
			inset && 'pl-8',
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRight className="ml-auto h-4 w-4" />
	</MenubarPrimitive.SubTrigger>
));

UIMenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const UIMenubarSubContent = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.SubContent
		ref={ref}
		className={cn(
			'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
			className,
		)}
		{...props}
	/>
));

UIMenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const UIMenubarContent = React.forwardRef<React.ElementRef<typeof MenubarPrimitive.Content>, React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>>(
	({ className, align = 'start', alignOffset = -4, sideOffset = 8, ...props }, ref) => (
		<MenubarPrimitive.Portal>
			<MenubarPrimitive.Content
				ref={ref}
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cn(
					'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					className,
				)}
				{...props}
			/>
		</MenubarPrimitive.Portal>
	),
);

UIMenubarContent.displayName = MenubarPrimitive.Content.displayName;

const UIMenubarItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
		readonly inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<MenubarPrimitive.Item
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			inset && 'pl-8',
			className,
		)}
		{...props}
	/>
));

UIMenubarItem.displayName = MenubarPrimitive.Item.displayName;

const UIMenubarCheckboxItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<MenubarPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<Check className="h-4 w-4" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.CheckboxItem>
));

UIMenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const UIMenubarRadioItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<MenubarPrimitive.RadioItem
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<Circle className="h-2 w-2 fill-current" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.RadioItem>
));

UIMenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const UIMenubarLabel = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
		readonly inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<MenubarPrimitive.Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} {...props} />
));

UIMenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const UIMenubarSeparator = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => <MenubarPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />);

UIMenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const UIMenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
	return <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />;
};

UIMenubarShortcut.displayname = 'MenubarShortcut';

export {
	UIMenubar,
	UIMenubarMenu,
	UIMenubarTrigger,
	UIMenubarContent,
	UIMenubarItem,
	UIMenubarSeparator,
	UIMenubarLabel,
	UIMenubarCheckboxItem,
	UIMenubarRadioGroup,
	UIMenubarRadioItem,
	UIMenubarPortal,
	UIMenubarSubContent,
	UIMenubarSubTrigger,
	UIMenubarGroup,
	UIMenubarSub,
	UIMenubarShortcut,
};
