import type { Meta, StoryObj } from '@storybook/react-vite';

import { Flex } from './flex';

const meta: Meta<typeof Flex> = {
  component: Flex,
  title: 'Shared/Flex',
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const Primary: Story = {
  args: {
    align: 'center',
    children: (
      <>
        <div style={{ background: 'grey', height: '100px', width: '100px' }} />
        <div style={{ background: 'grey', height: '100px', width: '100px' }} />
        <div style={{ background: 'grey', height: '100px', width: '100px' }} />
        <div style={{ background: 'grey', height: '100px', width: '100px' }} />
        <div style={{ background: 'grey', height: '100px', width: '100px' }} />
        <div style={{ background: 'grey', height: '100px', width: '100px' }} />
        <div style={{ background: 'grey', height: '100px', width: '100px' }} />
        <div style={{ background: 'grey', height: '100px', width: '100px' }} />
      </>
    ),
    direction: 'row',
    flexJustify: 'between',
    fullWidth: true,
    gap: '8',
    wrap: 'wrap',
  },
};
