import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@shared/ui/button/button.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';

import { Card } from './card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Shared/Card',
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    children: (
      <VStack gap={'32'}>
        <Typography as={'h1'} size={'xl'}>
          Test Card Component
        </Typography>
        <Button>Card button</Button>
      </VStack>
    ),
  },
};
