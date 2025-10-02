import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { ProgressBar } from '@shared/ui/progress-bar/progress-bar.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';

const cnBookProgress = cn('BookProgress');

interface BookProgressProps {
  percent: number;
  className?: string;
}

export const BookProgress: FC<BookProgressProps> = (props) => {
  const { className, percent } = props;

  return (
    <VStack className={cnBookProgress(undefined, [className])} gap={'4'}>
      <HStack flexJustify={'between'}>
        <Typography size={'3xs'} variant={'secondary'}>
          Прогресс
        </Typography>
        <Typography size={'3xs'} variant={'secondary'}>
          {percent}%
        </Typography>
      </HStack>

      <ProgressBar max={100} value={percent} variant={'secondary'} />
    </VStack>
  );
};
