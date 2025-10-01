import type { FC } from 'react';

import { cn } from '@bem-react/classname';

const cnGoalBannerBase = cn('GoalBannerBase');

interface GoalBannerBaseProps {
  className?: string;
}

export const GoalBannerBase: FC<GoalBannerBaseProps> = (props) => {
  return (
    <div className={cnGoalBannerBase(undefined, [props.className])}>
      GoalBannerBase
    </div>
  );
};
