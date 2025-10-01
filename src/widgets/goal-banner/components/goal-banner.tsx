import type { FC } from 'react';

import './goal-banner.scss';
import { cn } from '@bem-react/classname';
import { Typography } from '@shared/ui/typography/typography.tsx';

const cnGoalBanner = cn('GoalBanner');

type GoalMockData = {
  completed: number; // 2
  percent: number; // 10
  total: number; // 20
  unit: string; // "книг"
  year: number; // 2024
};

interface GoalBannerProps {
  className?: string;
}

export const GoalBanner: FC<GoalBannerProps> = (props) => {
  return (
    <section className={cnGoalBanner(undefined, [props.className])}>
      <Typography>Цель 2024</Typography>
    </section>
  );
};
