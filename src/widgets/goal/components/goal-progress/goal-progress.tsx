import type { ComponentProps, FC } from 'react';

import { cn } from '@bem-react/classname';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';

const cnGoalProgress = cn('GoalProgress');

interface GoalProgressProps {
  percent: number;
  className?: string;
  size?: ComponentProps<typeof ProgressBar>['size'];
}

export const GoalProgress: FC<GoalProgressProps> = (props) => {
  const { className, percent, size } = props;

  return (
    <ProgressBar
      className={cnGoalProgress(undefined, [className])}
      max={100}
      size={size}
      value={percent}
    />
  );
};
