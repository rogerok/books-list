import './progress-bar.scss';

import type { FC, ProgressHTMLAttributes } from 'react';

import { cn } from '@bem-react/classname';

const cnProgressBar = cn('ProgressBar');

interface ProgressBarProps extends ProgressHTMLAttributes<HTMLProgressElement> {
  className?: string;
  size?: 'medium' | 'small';
  variant?: 'primary' | 'purple' | 'secondary';
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const {
    className,
    size = 'small',
    variant = 'primary',
    ...restProps
  } = props;

  return (
    <progress
      className={cnProgressBar(
        {
          size: size,
          variant: variant,
        },
        [className],
      )}
      {...restProps}
    />
  );
};
