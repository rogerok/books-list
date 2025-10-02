import type { ComponentProps, FC } from 'react';

import { cn } from '@bem-react/classname';
import { Typography } from '@shared/ui/typography/typography.tsx';

const cnGoalTitle = cn('GoalTitle');

interface GoalTitleProps {
  year: number;
  className?: string;
  weight?: ComponentProps<typeof Typography>['weight'];
}

export const GoalTitle: FC<GoalTitleProps> = (props) => {
  const { className, weight = 'medium', year } = props;

  return (
    <Typography
      className={cnGoalTitle(undefined, [className])}
      size={'sm'}
      weight={weight}
    >
      Цель {year}
    </Typography>
  );
};
