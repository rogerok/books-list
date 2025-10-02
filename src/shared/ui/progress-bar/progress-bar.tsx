import './progress-bar.scss';

import type { FC, ProgressHTMLAttributes } from 'react';

import { cn } from '@bem-react/classname';

const cnProgressBar = cn('ProgressBar');

interface ProgressBarProps extends ProgressHTMLAttributes<HTMLProgressElement> {
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { className, variant = 'primary', ...restProps } = props;

  return (
    <progress
      className={cnProgressBar(
        {
          variant: variant,
        },
        [className],
      )}
      {...restProps}
    />
  );
};
