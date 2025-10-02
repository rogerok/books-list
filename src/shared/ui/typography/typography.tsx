import './typography.scss';

import { cn } from '@bem-react/classname';
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react';

type TypographyVariant =
  | 'accent'
  | 'accent2'
  | 'dark'
  | 'light'
  | 'lightDark'
  | 'primary'
  | 'secondary'
  | 'warn'
  | 'white';

const cnTypography = cn('Typography');
type TypographySize = '2xl' | '2xs' | '3xs' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';
type TypographyWeight = 'medium' | 'normal' | 'semibold';
type TypographyAlign = 'center' | 'left' | 'right';

type TypographyProps<T extends ElementType> = {
  children: ReactNode;
  align?: TypographyAlign;
  as?: T;
  className?: string;
  dataTestId?: string;
  fullWidth?: boolean;
  gutterBottom?: boolean;
  size?: TypographySize;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  wordBreak?: boolean;
} & ComponentPropsWithoutRef<T>;

export const Typography = <T extends ElementType = 'span'>(
  props: TypographyProps<T>,
): ReactNode => {
  const {
    align = 'left',
    as,
    children,
    className,
    dataTestId,
    fullWidth,
    gutterBottom,
    size = 'xs',
    variant = 'primary',
    weight = 'normal',
    wordBreak = true,
    ...restProps
  } = props;

  const mods = {
    align: align,
    break: wordBreak,
    fullWidth: fullWidth,
    gutterBottom: gutterBottom,
    size: size,
    variant: variant,
    weight: weight,
  };

  const Component = as || 'span';

  return (
    <Component
      className={cnTypography(mods, [className])}
      data-testid={dataTestId}
      {...restProps}
    >
      {children}
    </Component>
  );
};
