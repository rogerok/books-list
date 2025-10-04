import type { FC, ReactNode } from 'react';

import { cn } from '@bem-react/classname';

import './badge.scss';

const cnBadge = cn('Badge');

type Rounded = '10' | '14' | '16' | '8' | 'circle';

interface BadgeProps {
  background:
    | 'blue-100'
    | 'green-100'
    | 'green-200'
    | 'neutral-150'
    | 'orange-100'
    | 'purple-100';
  children: ReactNode;
  className?: string;
  rounded?: Rounded;
  size?: 'lg' | 'md' | 'unset' | 'xl';
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
