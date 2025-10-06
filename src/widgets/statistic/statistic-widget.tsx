import { cn } from '@bem-react/classname';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect } from 'react';

const cnStatisticWidget = cn('StatisticWidget');

interface StatisticWidgetProps {
  className?: string;
}

export const StatisticWidget: FC<StatisticWidgetProps> = observer((props) => {
  const { stats } = useRootStore();

  useEffect(() => {
    stats.fetchStats();
  }, [stats]);

  if (stats.isLoading) {
    return <Skeleton height={80} rounded={'14'} />;
  }

  return (
    stats.data && (
      <HStack
        className={cnStatisticWidget(undefined, [props.className])}
        flexJustify={'between'}
      >
        <VStack align={'center'} gap={'8'}>
          <Typography size={'lg'} variant={'accent6'} weight={'semibold'}>
            {stats.data.read}
          </Typography>
          <Typography size={'3xs'} variant={'secondary'}>
            Прочитано
          </Typography>
        </VStack>
        <VStack align={'center'} gap={'8'}>
          <Typography size={'lg'} variant={'accent5'} weight={'semibold'}>
            {stats.data.reading}
          </Typography>
          <Typography size={'3xs'} variant={'secondary'}>
            Читаю
          </Typography>
        </VStack>
        <VStack align={'center'} gap={'8'}>
          <Typography size={'lg'} variant={'accent4'} weight={'semibold'}>
            {stats.data.toRead}
          </Typography>
          <Typography size={'3xs'} variant={'secondary'}>
            К чтению
          </Typography>
        </VStack>
      </HStack>
    )
  );
});
