import type { Meta, StoryObj } from '@storybook/react';
import { UICalendar, type CalendarProps } from '@/ui/UICalendar';
import 'react-day-picker/dist/style.css';

const meta: Meta<CalendarProps> = {
	title: 'Components/UICalendar',
	component: UICalendar,
	argTypes: {
		showOutsideDays: {
			control: 'boolean',
			description: 'Show days from the previous or next month.',
			defaultValue: true,
		},
	},
};

export default meta;

export const Default: StoryObj<CalendarProps> = {
	args: {
		showOutsideDays: true,
	},
};

export const CustomStyles: StoryObj<CalendarProps> = {
	args: {
		className: 'rounded-lg shadow-lg',
		showOutsideDays: true,
	},
};
