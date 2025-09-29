import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'Shared/Divider',
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Primary: Story = {
  args: {},
};
