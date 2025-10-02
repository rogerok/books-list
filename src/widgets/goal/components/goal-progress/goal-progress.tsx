import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';

const cnGoalProgress = cn('GoalProgress');

interface GoalProgressProps {
  percent: number;
  className?: string;
}

export const GoalProgress: FC<GoalProgressProps> = (props) => {
  const { className, percent } = props;

  return (
    <ProgressBar
      className={cnGoalProgress(undefined, [className])}
      max={100}
      value={percent}
    />
  );
};
