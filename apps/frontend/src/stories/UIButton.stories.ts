import type { Meta, StoryObj } from '@storybook/react';
import { UIButton } from '@/ui/UIButton';

const variantOptions = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
const sizeOptions = ['default', 'sm', 'lg', 'icon'];

const meta: Meta<typeof UIButton> = {
	title: 'Components/UIButton',
	component: UIButton,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: variantOptions,
		},
		size: {
			control: 'select',
			options: sizeOptions,
		},
		disabled: {
			control: 'boolean',
		},
		children: {
			control: 'text',
		},
		asChild: {
			control: 'boolean',
		},
	},
};

export default meta;

export const BasicButton: StoryObj<typeof meta> = {
	args: {
		children: 'Click Me',
	},
};

export const DisabledButton: StoryObj<typeof meta> = {
	args: {
		children: 'Disabled',
		disabled: true,
	},
};
