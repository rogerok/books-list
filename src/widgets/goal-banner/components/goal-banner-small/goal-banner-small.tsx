import type { GoalMockData } from '@widgets/goal-banner/components/goal-banner.tsx';
import type { FC } from 'react';

import './goal-banner-small.scss';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { GoalBannerBase } from '@widgets/goal-banner/components/goal-banner-base/goal-banner-base.tsx';
import { GoalBannerProgressBar } from '@widgets/goal-banner/components/goal-banner-progress-bar/goal-banner-progress-bar.tsx';
import { GoalCounter } from '@widgets/goal-banner/components/goal-counter/goal-counter.tsx';
import { GoalTitle } from '@widgets/goal-banner/components/goal-title/goal-title.tsx';

const cnGoalBannerSmall = cn('GoalBannerSmall');

interface GoalBannerSmallProps {
  data: GoalMockData;
  className?: string;
}

export const GoalBannerSmall: FC<GoalBannerSmallProps> = (props) => {
  const { className, data } = props;

  return (
    <GoalBannerBase className={cnGoalBannerSmall(undefined, [className])}>
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
        <GoalBannerProgressBar percent={data.percent} />
        <Typography size={'3xs'} variant={'secondary'}>
          {data.percent}% выполнено
        </Typography>
      </VStack>
    </GoalBannerBase>
  );
};
