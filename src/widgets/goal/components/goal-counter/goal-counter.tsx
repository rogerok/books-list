import type { ComponentProps, FC } from 'react';

import { cn } from '@bem-react/classname';
import { Typography } from '@shared/ui/typography/typography.tsx';

const cnGoalCounter = cn('GoalCounter');

interface GoalCounterProps {
  completed: number;
  total: number;
  className?: string;
  variant?: Extract<
    ComponentProps<typeof Typography>['variant'],
    'accent2' | 'primary'
  >;
}

export const GoalCounter: FC<GoalCounterProps> = (props) => {
  const { className, completed, total, variant } = props;
  return (
    <Typography
      className={cnGoalCounter(undefined, [className])}
      size={'2xs'}
      variant={variant}
      weight={'medium'}
    >
      {completed}/{total}
    </Typography>
  );
};
