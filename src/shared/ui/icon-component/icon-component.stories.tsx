import type { Meta, StoryObj } from '@storybook/react-vite';

const iconsKeys = Object.keys(Icons);
import * as Icons from '@shared/assets/icons';
import { ColorConstant } from '@shared/constants/style-system/colors';
import { IconComponent } from '@shared/ui/icon-component/icon-component';

const meta: Meta<typeof IconComponent> = {
  argTypes: {
    color: {
      control: { type: 'select' },
      options: Object.values(ColorConstant),
    },
    name: {
      control: { type: 'select' },
      options: iconsKeys,
    },
  },
  component: IconComponent,
  title: 'Shared/IconComponent',
};

export default meta;

type Story = StoryObj<typeof IconComponent>;

export const IconsList: Story = {
  render: () => (
    <div>
      {iconsKeys.map((iconName) => (
        <IconComponent
          key={iconName}
          name={iconName as keyof typeof Icons}
          size="sm"
        />
      ))}
    </div>
  ),
};

export const SmIcon: Story = {
  args: {
    color: 'blue-100',
    name: 'accountIcon',
    size: 'sm',
  },
};

export const MdIcon: Story = {
  args: {
    name: 'goalIcon',
    size: 'md',
  },
};

export const LgIcon: Story = {
  args: {
    name: 'pencilIcon',
    size: 'md',
  },
};

export const Clickable: Story = {
  args: {
    name: 'homeIcon',
    onClick: () => console.log('onClick'),
    size: 'md',
  },
};
