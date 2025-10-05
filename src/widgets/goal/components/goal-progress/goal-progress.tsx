import type { ComponentProps, FC } from 'react';

import { cn } from '@bem-react/classname';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';

const cnGoalProgress = cn('GoalProgress');

interface GoalProgressProps {
  total: number;
  value: number;
  className?: string;
  size?: ComponentProps<typeof ProgressBar>['size'];
}

export const GoalProgress: FC<GoalProgressProps> = (props) => {
  const { className, size, total, value } = props;

  return (
    <ProgressBar
      className={cnGoalProgress(undefined, [className])}
      max={total}
      size={size}
      value={value}
    />
  );
};
