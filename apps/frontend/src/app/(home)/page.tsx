'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { UIAccordion, UIAccordionContent, UIAccordionItem, UIAccordionTrigger } from '@/ui/UIAccordion';
import { UIInput } from '@/ui/UIInput';

const Dashboard = () => {
	const { theme, setTheme } = useTheme();

	return (
		<>
			<div className="w-fit">
				<UIAccordion type="single" collapsible>
					<UIAccordionItem value="item-1">
						<UIAccordionTrigger>Is it accessible?</UIAccordionTrigger>
						<UIAccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</UIAccordionContent>
					</UIAccordionItem>
				</UIAccordion>
				<UIInput />
			</div>
			<button
				type="button"
				className="bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 px-8 py-2 text-2xl md:text-4xl rounded-lg absolute bottom-32"
				onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
			>
				Toggle Mode
			</button>
		</>
	);
};

export default React.memo(Dashboard);
