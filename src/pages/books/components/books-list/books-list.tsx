import { cn } from '@bem-react/classname';
import { useBooksPageStore } from '@pages/books/stores/books-page-store.ts';
import { ElementRepeater } from '@shared/ui/element-repeater/element-repeater.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { BookWidget } from '@widgets/book';

import './books-list.scss';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect } from 'react';

const cnBooksList = cn('BooksList');

interface BooksListProps {
  className?: string;
}

const BookListSkeleton = () => {
  return (
    <ElementRepeater count={4}>
      <Skeleton height={280} rounded={'14'} width={280} />
    </ElementRepeater>
  );
};

export const BooksList: FC<BooksListProps> = observer((props) => {
  const { className } = props;

  const { data, fetchBooks, isBooksLoading, tabManager } = useBooksPageStore();

  useEffect(() => {
    fetchBooks(tabManager.activeTab);
  }, [fetchBooks, tabManager.activeTab]);

  return (
    <ul className={cnBooksList(undefined, [className])}>
      {isBooksLoading ? (
        <BookListSkeleton />
      ) : (
        <>
          {data.map((book) => (
            <li className={cnBooksList('Item')} key={book.bookId}>
              <BookWidget
                className={cnBooksList('Widget')}
                data={book}
                variant={'card'}
              />
            </li>
          ))}
        </>
      )}
    </ul>
  );
});
