import type { GoalMockData } from '@widgets/goal/components/goal-widget.tsx';
import type { FC } from 'react';

import './goal-widget-small.scss';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { GoalCounter } from '@widgets/goal/components/goal-counter/goal-counter.tsx';
import { GoalProgress } from '@widgets/goal/components/goal-progress/goal-progress.tsx';
import { GoalTitle } from '@widgets/goal/components/goal-title/goal-title.tsx';
import { GoalWidgetBase } from '@widgets/goal/components/goal-widget-base/goal-widget-base.tsx';

const cnGoalWidgetSmall = cn('GoalWidgetSmall');

interface GoalWidgetSmallProps {
  data: GoalMockData;
  className?: string;
}

export const GoalWidgetSmall: FC<GoalWidgetSmallProps> = (props) => {
  const { className, data } = props;

  return (
    <GoalWidgetBase className={cnGoalWidgetSmall(undefined, [className])}>
      <HStack align={'center'} gap={'4'}>
        <IconComponent
          color={ColorConstant.Green600}
          name={'progressIcon'}
          size={'xxs'}
        />
        <GoalTitle year={new Date().getFullYear()} />
      </HStack>
      <VStack gap={'8'}>
        <HStack flexJustify={'between'}>
          <Typography variant={'secondary'}>Прогресс</Typography>
          <GoalCounter completed={data.completed} total={data.total} />
        </HStack>
        <GoalProgress percent={data.percent} />
        <Typography size={'3xs'} variant={'secondary'}>
          {data.percent}% выполнено
        </Typography>
      </VStack>
    </GoalWidgetBase>
  );
};
