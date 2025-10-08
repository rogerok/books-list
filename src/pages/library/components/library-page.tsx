import type { FC } from 'react';

import './library-page.scss';
import { cn } from '@bem-react/classname';
import { BooksContent } from '@pages/library/components/books-content/books-content.tsx';
import { LibraryPageStoreProvider } from '@pages/library/stores/library-page-store.ts';
import { PageMeta } from '@shared/ui/page-meta/page-meta.tsx';
import { StatisticWidget } from '@widgets/statistic';

const cnLibraryPage = cn('LibraryPage');

export const LibraryPage: FC = () => {
  return (
    <section className={cnLibraryPage(undefined, [])}>
      <PageMeta title={'Моя библиотека'} />
      <LibraryPageStoreProvider>
        <BooksContent />
      </LibraryPageStoreProvider>
      <StatisticWidget />
    </section>
  );
};
