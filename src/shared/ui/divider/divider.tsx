import './divider.scss';

import type { FC } from 'react';

import { cn } from '@bem-react/classname';

const cnDivider = cn('Divider');

interface DividerProps {
  className?: string;
  flexItem?: boolean;
  vertical?: boolean;
}

export const Divider: FC<DividerProps> = (props) => {
  const { className, flexItem, vertical } = props;

  return (
    <hr
      className={cnDivider(
        {
          flexItem: flexItem,
          vertical: vertical,
        },
        [className],
      )}
    />
  );
};
