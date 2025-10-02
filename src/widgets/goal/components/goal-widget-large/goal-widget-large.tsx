import type { GoalMockData } from '@widgets/goal/components/goal-widget.tsx';
import type { FC } from 'react';

import './goal-widget-large.scss';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { pluralize, pluralizeBooks } from '@shared/utils/pluralize.ts';
import { GoalCounter } from '@widgets/goal/components/goal-counter/goal-counter.tsx';
import { GoalProgress } from '@widgets/goal/components/goal-progress/goal-progress.tsx';

const cnGoalWidgetLarge = cn('GoalWidgetLarge');

interface GoalWidgetLargeProps {
  data: GoalMockData;
  className?: string;
}

export const GoalWidgetLarge: FC<GoalWidgetLargeProps> = (props) => {
  const { className, data } = props;

  const booksToGoal = data.total - data.completed;

  return (
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
            completed={data.completed}
            total={data.total}
            variant={'accent2'}
          />
        </HStack>
      </HStack>
      <VStack gap={'8'}>
        <GoalProgress percent={data.percent} size={'medium'} />
        <HStack as={'p'} flexJustify={'between'}>
          <Typography size={'xs'} variant={'secondary'}>
            2 {pluralizeBooks(data.completed)}{' '}
            {pluralize(data.completed, ['прочитана', 'прочитаны', 'прочитано'])}
          </Typography>
          <Typography size={'xs'} variant={'secondary'}>
            {data.percent}% от цели
          </Typography>
        </HStack>
      </VStack>
      <Typography size={'2xs'} variant={'secondary'}>
        {booksToGoal
          ? `Для достижения цели ещё ${booksToGoal} ${pluralizeBooks(booksToGoal)} !`
          : 'Цель выполнена'}
      </Typography>
    </div>
  );
};
