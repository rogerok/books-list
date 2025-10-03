import type { FC, ReactNode } from 'react';

import { cn } from '@bem-react/classname';

import './badge.scss';

const cnBadge = cn('Badge');

type Rounded = '10' | '14' | '16' | '8' | 'circle';

interface BadgeProps {
  background: 'green-100' | 'green-200' | 'purple-100';
  children: ReactNode;
  size: 'lg' | 'md' | 'xl';
  className?: string;
  rounded?: Rounded;
}

export const Badge: FC<BadgeProps> = (props) => {
  const { background, children, className, rounded, size } = props;

  return (
    <div
      className={cnBadge(
        {
          background: background,
          rounded: rounded,
          size: size,
        },
        [className],
      )}
    >
      {children}
    </div>
  );
};
