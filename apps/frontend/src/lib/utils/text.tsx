import { UITooltipProvider, UITooltip, UITooltipTrigger, UITooltipContent } from '@/ui/UITooltip';

export const addEllipsis = (text: string, maxLength: number): React.JSX.Element => {
	if (text.length > maxLength) {
		return (
			<UITooltipProvider>
				<UITooltip>
					<UITooltipTrigger className=" text-start cursor-default">
						<span>{text.substring(0, maxLength - 3) + '...'}</span>
					</UITooltipTrigger>
					<UITooltipContent className=" font-normal text-sm max-w-[300px]">{text}</UITooltipContent>
				</UITooltip>
			</UITooltipProvider>
		);
	} else {
		return <span>{text}</span>;
	}
};
