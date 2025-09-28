import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input as InputComponent } from '@shared/ui/input/input';

const meta: Meta<typeof InputComponent> = {
  args: {
    label: 'Label text',
    placeholder: 'Placeholder',
    required: true,
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: {
      control: 'text',
    },
  },
  component: InputComponent,

  title: 'Shared/Input',
};

export default meta;

type Story = StoryObj<typeof InputComponent>;

export const Input: Story = {};

export const InputWithError: Story = {
  args: {
    error: 'Fill the input',
  },
};
export const InputWithValue: Story = {
  args: {
    value: 'Some value',
  },
};
