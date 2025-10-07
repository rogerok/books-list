import type { FC } from 'react';

import './goal-widget-small.scss';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { GoalCounter } from '@widgets/goal/components/goal-counter/goal-counter.tsx';
import { GoalProgress } from '@widgets/goal/components/goal-progress/goal-progress.tsx';
import { GoalTitle } from '@widgets/goal/components/goal-title/goal-title.tsx';
import { observer } from 'mobx-react-lite';

const cnGoalWidgetSmall = cn('GoalWidgetSmall');

interface GoalWidgetSmallProps {
  className?: string;
}

export const GoalWidgetSmall: FC<GoalWidgetSmallProps> = observer((props) => {
  const { className } = props;
  const { goal } = useRootStore();

  if (goal.isLoading) {
    return <Skeleton height={127} rounded={'14'} width={272} />;
  }

  return (
    goal.data && (
      <div className={cnGoalWidgetSmall(undefined, [className])}>
        <HStack align={'center'} gap={'4'}>
          <IconComponent
            color={ColorConstant.Green600}
            name={'progressIcon'}
            size={'xxs'}
          />
          <GoalTitle year={goal.goalYear} />
        </HStack>
        <VStack gap={'8'}>
          <HStack flexJustify={'between'}>
            <Typography variant={'secondary'}>Прогресс</Typography>
            <GoalCounter
              completed={goal.data.readCount}
              total={goal.data.targetBooks}
            />
          </HStack>
          <GoalProgress
            total={goal.data.targetBooks}
            value={goal.data.readCount}
          />
          <Typography size={'3xs'} variant={'secondary'}>
            {goal.percentageCompleted}% выполнено
          </Typography>
        </VStack>
      </div>
    )
  );
});
