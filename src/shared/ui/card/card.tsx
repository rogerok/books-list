import type { FC, ReactNode } from 'react';

import './card.scss';
import { cn } from '@bem-react/classname';

const cnCard = cn('Card');

type ElevationType = 'lg' | 'md' | 'sm' | 'xs';
type Rounded = '10' | '14' | '16' | '8';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: ElevationType;
  rounded?: Rounded;
  variant?: 'light' | 'primary' | 'secondary';
}

export const Card: FC<CardProps> = (props) => {
  const {
    children,
    className,
    elevation,
    rounded = '14',
    variant = 'primary',
  } = props;

  return (
    <div
      className={cnCard(
        {
          elevation: elevation,
          rounded: rounded,
          variant: variant,
        },
        [className],
      )}
    >
      {children}
    </div>
  );
};
