import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppLink } from './app-link';

const meta: Meta<typeof AppLink> = {
  argTypes: {
    children: { control: 'text' },
    to: { control: 'text' },
  },
  component: AppLink,
  title: 'Shared/AppLink',
};

export default meta;

type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
  args: {
    children: 'Home',
    to: '/',
    variant: 'primary',
  },
};
