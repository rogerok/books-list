import './typography.scss';

import { cn } from '@bem-react/classname';
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  memo,
  type ReactNode,
} from 'react';

const cnTypography = cn('Typography');

type TypographyVariants = 'dark' | 'light' | 'primary' | 'secondary' | 'warn';
type TypographySize = '2xs' | '3xs' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';
type TypographyWeight = 'medium' | 'normal' | 'semibold';
type TypographyAlign = 'center' | 'left' | 'right';

type TypographyProps<T extends ElementType> = {
  children: ReactNode;
  align?: TypographyAlign;
  as?: T;
  className?: string;
  dataTestId?: string;
  fullWidth?: boolean;
  size?: TypographySize;
  variant?: TypographyVariants;
  weight?: TypographyWeight;
  wordBreak?: boolean;
} & ComponentPropsWithoutRef<T>;

export const Typography = memo(
  <T extends ElementType = 'span'>(props: TypographyProps<T>): ReactNode => {
    const {
      align = 'left',
      as,
      children,
      className,
      dataTestId,
      fullWidth,
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
  },
);
