import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';

const cnStatisticWidget = cn('StatisticWidget');

interface StatisticWidgetProps {
  className?: string;
}

const mockData = {
  read: 3,
  reading: 2,
  toRead: 1,
};

export const StatisticWidget: FC<StatisticWidgetProps> = observer((props) => {
  return (
    <HStack
      className={cnStatisticWidget(undefined, [props.className])}
      flexJustify={'between'}
    >
      <VStack align={'center'} gap={'8'}>
        <Typography size={'lg'} variant={'accent6'} weight={'semibold'}>
          {mockData.read}
        </Typography>
        <Typography size={'3xs'} variant={'secondary'}>
          Прочитано
        </Typography>
      </VStack>
      <VStack align={'center'} gap={'8'}>
        <Typography size={'lg'} variant={'accent5'} weight={'semibold'}>
          {mockData.reading}
        </Typography>
        <Typography size={'3xs'} variant={'secondary'}>
          Читаю
        </Typography>
      </VStack>
      <VStack align={'center'} gap={'8'}>
        <Typography size={'lg'} variant={'accent4'} weight={'semibold'}>
          {mockData.toRead}
        </Typography>
        <Typography size={'3xs'} variant={'secondary'}>
          К чтению
        </Typography>
      </VStack>
    </HStack>
  );
});
