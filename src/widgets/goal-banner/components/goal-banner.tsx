import type { FC, ReactNode } from 'react';

import './goal-banner.scss';
import { cn } from '@bem-react/classname';
import { GoalBannerSmall } from '@widgets/goal-banner/components/goal-banner-small/goal-banner-small.tsx';

const cnGoalBanner = cn('GoalBanner');

export type GoalMockData = {
  completed: number; // 2
  percent: number; // 10
  total: number; // 20
  year: number; // 2024
};

const mockData: GoalMockData = {
  completed: 2,
  percent: 20,
  total: 20,
  year: 2024,
};

interface GoalBannerProps {
  variant: 'large' | 'small';
  className?: string;
}

export const GoalBanner: FC<GoalBannerProps> = (props) => {
  const { className, variant } = props;

  let component: ReactNode | null = null;

  switch (variant) {
    case 'small':
      component = <GoalBannerSmall data={mockData} />;
    // case 'large':
    // component = <GoalBanner data={mockData} />;
  }

  return (
    <section className={cnGoalBanner(undefined, [className])}>
      {component}
    </section>
  );
};
