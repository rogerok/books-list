import { cn } from '@bem-react/classname';
import { useBooksPageStore } from '@pages/books/stores/books-page-store.ts';
import { BookWidget } from '@widgets/book';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect } from 'react';

import './books-list.scss';

const cnBooksList = cn('BooksList');

interface BooksListProps {
  className?: string;
}

export const BooksList: FC<BooksListProps> = observer((props) => {
  const { className } = props;

  const { data, fetchBooks, tabManager } = useBooksPageStore();

  useEffect(() => {
    fetchBooks(tabManager.activeTab);
  }, [fetchBooks, tabManager.activeTab]);

  return (
    <ul className={cnBooksList(undefined, [className])}>
      {data.map((book) => (
        <li className={cnBooksList('Item')} key={book.bookId}>
          <BookWidget
            className={cnBooksList('Widget')}
            data={book}
            variant={'card'}
          />
        </li>
      ))}
    </ul>
  );
});
