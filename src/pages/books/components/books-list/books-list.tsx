import { cn } from '@bem-react/classname';
import { useBooksPageStore } from '@pages/books/stores/books-page-store.ts';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect } from 'react';

const cnBooksList = cn('BooksList');

interface BooksListProps {
  className?: string;
}

export const BooksList: FC<BooksListProps> = observer((props) => {
  const { className } = props;

  const { fetchBooks, tabManager } = useBooksPageStore();

  useEffect(() => {
    fetchBooks(tabManager.activeTab);
  }, [fetchBooks, tabManager.activeTab]);

  return <div className={cnBooksList(undefined, [className])}>BooksList</div>;
});
