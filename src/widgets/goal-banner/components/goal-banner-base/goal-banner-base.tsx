import type { FC, ReactNode } from 'react';

import { cn } from '@bem-react/classname';

const cnGoalBannerBase = cn('GoalBannerBase');

interface GoalBannerBaseProps {
  children: ReactNode;
  className?: string;
}

export const GoalBannerBase: FC<GoalBannerBaseProps> = (props) => {
  return (
    <div className={cnGoalBannerBase(undefined, [props.className])}>
      {props.children}
    </div>
  );
};
