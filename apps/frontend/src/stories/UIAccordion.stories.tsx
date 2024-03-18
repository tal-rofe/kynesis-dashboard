import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { UIAccordion, UIAccordionItem, UIAccordionTrigger, UIAccordionContent } from '@/ui/UIAccordion';

const meta: Meta<typeof UIAccordion> = {
	title: 'Components/UIAccordion',
	component: UIAccordion,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;

export const BasicAccordion: StoryObj<typeof UIAccordion> = {
	render: () => (
		<UIAccordion type="single" collapsible>
			<UIAccordionItem value="item-1">
				<UIAccordionTrigger>Is it accessible?</UIAccordionTrigger>
				<UIAccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</UIAccordionContent>
			</UIAccordionItem>
		</UIAccordion>
	),
	args: {},
};

export const TestAccordionInteraction: StoryObj<typeof UIAccordion> = {
	render: BasicAccordion.render,
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const trigger = canvas.getByText('Is it accessible?');

		await userEvent.click(trigger);

		const content = canvas.getByText('Yes. It adheres to the WAI-ARIA design pattern.');

		await expect(content).toBeVisible();
	},
};
