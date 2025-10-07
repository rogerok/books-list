import { cn } from '@bem-react/classname';
import { useBooksPageStore } from '@pages/books/stores/books-page-store.ts';
import { Tabs } from '@shared/components/tabs/tabs.tsx';
import { Badge } from '@shared/ui/badge/badge.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect } from 'react';

const cnBooksTabs = cn('BooksTabs');

interface BooksTabsProps {
  className?: string;
}

export const BooksTabs: FC<BooksTabsProps> = observer((props) => {
  const { className } = props;
  const { fetchTabsStats, tabManager } = useBooksPageStore();

  useEffect(() => {
    fetchTabsStats();
  }, [fetchTabsStats]);

  return (
    <Tabs
      className={cnBooksTabs(undefined, [className])}
      manager={tabManager}
      slot={(tab) => (
        <Badge background={'neutral-150'} rounded={'8'} size={'sm'}>
          {tab.counter}
        </Badge>
      )}
    />
  );
});
