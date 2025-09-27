import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from './typography';

const text = 'Lorem ipsum';

const meta: Meta<typeof Typography> = {
  args: {
    align: 'left',
    as: 'p',
    size: 'md',
    variant: 'primary',
    weight: 'normal',
  },
  component: Typography,
  title: 'ui/Typography',
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    children: text,
  },
};
