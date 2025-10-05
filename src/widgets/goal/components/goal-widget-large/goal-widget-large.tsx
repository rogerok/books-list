import type { FC } from 'react';

import './goal-widget-large.scss';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { pluralize, pluralizeBooks } from '@shared/utils/pluralize.ts';
import { GoalCounter } from '@widgets/goal/components/goal-counter/goal-counter.tsx';
import { GoalProgress } from '@widgets/goal/components/goal-progress/goal-progress.tsx';
import { observer } from 'mobx-react-lite';

const cnGoalWidgetLarge = cn('GoalWidgetLarge');

interface GoalWidgetLargeProps {
  className?: string;
}

export const GoalWidgetLarge: FC<GoalWidgetLargeProps> = observer((props) => {
  const { className } = props;
  const { goal } = useRootStore();

  if (goal.isLoading) {
    return <Skeleton height={200} rounded={'14'} />;
  }

  return (
    goal.data && (
      <div className={cnGoalWidgetLarge(undefined, [className])}>
        <HStack flexJustify={'between'}>
          <Typography as={'h5'} size={'sm'} weight={'semibold'}>
            Цель на {new Date().getFullYear()} год
          </Typography>
          <HStack gap={'4'}>
            <IconComponent
              color={ColorConstant.Orange200}
              name={'starFilledIcon'}
              size={'xxs'}
            />
            <GoalCounter
              completed={goal.data.readCount}
              total={goal.data.targetBooks}
              variant={'accent2'}
            />
          </HStack>
        </HStack>
        <VStack gap={'8'}>
          <GoalProgress
            size={'medium'}
            total={goal.data.targetBooks}
            value={goal.data.readCount}
          />
          <HStack as={'p'} flexJustify={'between'}>
            <Typography size={'xs'} variant={'secondary'}>
              {goal.data.readCount} {pluralizeBooks(goal.data.readCount)}{' '}
              {pluralize(goal.data.readCount, [
                'прочитана',
                'прочитаны',
                'прочитано',
              ])}
            </Typography>
            <Typography size={'xs'} variant={'secondary'}>
              {goal.percentageCompleted}% от цели
            </Typography>
          </HStack>
        </VStack>
        <Typography size={'2xs'} variant={'secondary'}>
          {goal.isCompleted
            ? 'Цель выполнена'
            : `Для достижения цели ещё ${goal.restToGoal} ${pluralizeBooks(goal.restToGoal)} !`}
        </Typography>
      </div>
    )
  );
});
