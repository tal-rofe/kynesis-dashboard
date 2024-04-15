import * as React from 'react';

import { cn } from '@/lib/utils/component';

const UICard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)} {...props} />
));

UICard.displayName = 'UICard';

const UICardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));

UICardHeader.displayName = 'UICardHeader';

const UICardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
	<h3 ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
));

UICardTitle.displayName = 'UICardTitle';

const UICardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));

UICardDescription.displayName = 'UICardDescription';

const UICardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));

UICardContent.displayName = 'UICardContent';

const UICardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));

UICardFooter.displayName = 'UICardFooter';

export { UICard, UICardHeader, UICardFooter, UICardTitle, UICardDescription, UICardContent };
