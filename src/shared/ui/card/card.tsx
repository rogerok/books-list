import type { FC, ReactNode } from 'react';

import './card.scss';
import { cn } from '@bem-react/classname';

const cnCard = cn('Card');

type ElevationType = 'lg' | 'md' | 'sm' | 'xs';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: ElevationType;
  variant?: 'primary' | 'secondary';
}

export const Card: FC<CardProps> = (props) => {
  const { children, className, elevation = 'sm', variant = 'primary' } = props;

  return (
    <div
      className={cnCard(
        {
          elevation: elevation,
          variant: variant,
        },
        [className],
      )}
    >
      {children}
    </div>
  );
};
