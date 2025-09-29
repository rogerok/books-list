import type { FC, ReactNode } from 'react';

import './card.scss';
import { cn } from '@bem-react/classname';

const cnCard = cn('Card');

type ElevationType = 'lg' | 'md' | 'sm';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: ElevationType;
}

export const Card: FC<CardProps> = (props) => {
  const { children, className, elevation = 'sm' } = props;

  return (
    <div
      className={cnCard(
        {
          elevation: elevation,
        },
        [className],
      )}
    >
      {children}
    </div>
  );
};
