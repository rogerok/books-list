import './Flex.scss';

import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';

import { cn } from '@bem-react/classname';

const cnFlex = cn('Flex');

export type Alignment = 'center' | 'end' | 'start' | 'stretch';
export type Justify =
  | 'around'
  | 'between'
  | 'center'
  | 'end'
  | 'evenly'
  | 'start';

export type FlexDirection = 'column' | 'row';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexGap = '16' | '32' | '8';

export type FlexProps<T extends ElementType = 'div'> = {
  align?: Alignment;
  as?: T;
  children?: ReactNode;
  className?: string;
  direction?: FlexDirection;
  flexJustify?: Justify;
  gap?: FlexGap;
  wrap?: FlexWrap;
} & ComponentPropsWithoutRef<T>;

export const Flex = <T extends ElementType = 'div'>(
  props: FlexProps<T>,
): ReactElement => {
  const {
    align,
    as = 'div',
    children,
    className,
    direction = 'row',
    flexJustify = 'start',
    gap,
    wrap = 'wrap',
    ...otherProps
  } = props;

  const Component = as;

  return (
    <Component
      {...otherProps}
      className={cnFlex(
        {
          align: align,
          direction: direction,

          gap: gap,
          justify: flexJustify,
          wrap: wrap,
        },
        [className],
      )}
    >
      {children}
    </Component>
  );
};
