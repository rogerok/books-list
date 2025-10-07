import type { FC } from 'react';

import './books-page.scss';
import { cn } from '@bem-react/classname';
import { BooksContent } from '@pages/books/components/books-content/books-content.tsx';
import { BooksPageStoreProvider } from '@pages/books/stores/books-page-store.ts';
import { StatisticWidget } from '@widgets/statistic';

const cnBooksPage = cn('BooksPage');

export const BooksPage: FC = () => {
  return (
    <section className={cnBooksPage(undefined, [])}>
      <BooksPageStoreProvider>
        <BooksContent />
      </BooksPageStoreProvider>
      <StatisticWidget />
    </section>
  );
};
