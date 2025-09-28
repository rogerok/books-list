import './icon-component.scss';

import type { ColorConstantValuesType } from '@shared/constants/style-system/colors';

import { cn } from '@bem-react/classname';
import * as Icons from '@shared/assets/icons';
import {
  type CSSProperties,
  type FC,
  type MouseEvent,
  type SVGProps,
} from 'react';

const cnIconComponent = cn('IconComponent');

const IconSizesMap = {
  lg: {
    height: 48,
    width: 48,
  },
  md: {
    height: 32,
    width: 32,
  },
  sm: {
    height: 24,
    width: 24,
  },
} as const;

export type IconSizes = keyof typeof IconSizesMap;

interface IconComponentBaseProps
  extends Omit<SVGProps<SVGSVGElement>, 'onClick'> {
  name: keyof typeof Icons;
  className?: string;
  color?: ColorConstantValuesType;
  dataTestId?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface IconComponentWithSizeProps extends IconComponentBaseProps {
  size: IconSizes;
  height?: never;
  width?: never;
}

interface IconComponentNoSize extends IconComponentBaseProps {
  height: number;
  width: number;
  size?: never;
}

type IconProps = IconComponentNoSize | IconComponentWithSizeProps;

export const IconComponent: FC<IconProps> = (props) => {
  const {
    className,
    color,
    disabled,
    height,
    name,
    onClick,
    size,
    width,
    ...restProps
  } = props;

  const sizes = size
    ? IconSizesMap[size]
    : {
        height: height,
        width: width,
      };

  const iconStyles: CSSProperties = {
    color: color ? `var(--${color})` : undefined,
  };

  const Icon = Icons[name];
  const Component = (
    <Icon
      {...restProps}
      {...sizes}
      className={cnIconComponent(undefined, [className])}
      style={iconStyles}
    />
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onClick?.();
  };

  if (onClick) {
    return (
      <button
        className={cnIconComponent(undefined, [className, 'IconButton'])}
        disabled={disabled}
        onClick={handleClick}
        style={sizes}
      >
        {Component}
      </button>
    );
  }
  return Component;
};
