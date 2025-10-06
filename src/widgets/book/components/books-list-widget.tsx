import { cn } from '@bem-react/classname';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { BookWidget } from '@widgets/book';
import { observer } from 'mobx-react-lite';
import { type ComponentProps, type FC, useEffect } from 'react';

const cnBooksWidgetsList = cn('BooksListWidget');

interface BooksWidgetsListProps {
  variant: ComponentProps<typeof BookWidget>['variant'];
  className?: string;
}

export const BooksListWidget: FC<BooksWidgetsListProps> = observer((props) => {
  const { books } = useRootStore();
  const { variant } = props;
  const { data, initialLoad, isLoading } = books;

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  if (isLoading) {
    return <Skeleton height={80} rounded={'14'} />;
  }

  return (
    data && (
      <VStack
        className={cnBooksWidgetsList(undefined, [props.className])}
        gap={'16'}
      >
        {data.map((item) => (
          <BookWidget data={item} key={item.id} variant={variant} />
        ))}
      </VStack>
    )
  );
});
