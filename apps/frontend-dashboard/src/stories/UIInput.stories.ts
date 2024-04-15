import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';

import { UIInput } from '@/ui/UIInput';

const meta: Meta<typeof UIInput> = {
	title: 'Components/UIInput',
	component: UIInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['text', 'email', 'password', 'number'],
			defaultValue: 'text',
		},
		placeholder: {
			control: 'text',
			defaultValue: 'Enter text...',
		},
		disabled: {
			control: 'boolean',
		},
	},
};

export default meta;

export const BasicInput: StoryObj<typeof meta> = {
	args: {
		placeholder: 'Type here...',
		type: 'text',
		disabled: false,
	},
};

export const TestInputFunctionality: StoryObj<typeof meta> = {
	args: {
		placeholder: 'Type here...',
		type: 'text',
		disabled: false,
	},

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const inputField = canvas.getByPlaceholderText('Type here...');

		await userEvent.type(inputField, 'Hello, World!');

		await expect(inputField).toHaveValue('Hello, World!');
	},
};
