import type { Meta, StoryObj } from '@storybook/react';
import UICheckbox from '@/ui/UICheckbox';

const meta: Meta<typeof UICheckbox> = {
	title: 'Components/UICheckbox',
	component: UICheckbox,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		checked: {
			control: 'boolean',
		},
		onClick: {
			action: 'clicked',
		},
	},
};

export default meta;

export const DefaultCheckbox: StoryObj<typeof meta> = {
	args: {
		checked: false,
		onClick: () => {},
	},
};
