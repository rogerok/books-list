import type { FC, ReactNode } from 'react';

import { cn } from '@bem-react/classname';

const cnGoalWidgetBase = cn('GoalWidgetBase');

interface GoalWidgetBaseProps {
  children: ReactNode;
  className?: string;
}

export const GoalWidgetBase: FC<GoalWidgetBaseProps> = (props) => {
  return (
    <div className={cnGoalWidgetBase(undefined, [props.className])}>
      {props.children}
    </div>
  );
};
