import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';

const cnGoalBannerProgressBar = cn('GoalBannerProgressBar');

interface GoalBannerProgressBarProps {
  percent: number;
  className?: string;
}

export const GoalBannerProgressBar: FC<GoalBannerProgressBarProps> = (
  props,
) => {
  const { className, percent } = props;

  return (
    <ProgressBar
      className={cnGoalBannerProgressBar(undefined, [className])}
      max={100}
      value={percent}
      variant={'primary'}
    />
  );
};
