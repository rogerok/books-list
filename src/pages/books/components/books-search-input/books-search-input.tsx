import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { useBooksPageStore } from '@pages/books/stores/books-page-store.ts';
import { Input } from '@shared/ui/input/input.tsx';
import { observer } from 'mobx-react-lite';

const cnBooksSearchInput = cn('BooksSearchInput');

interface BooksSearchInputProps {
  className?: string;
}

export const BooksSearchInput: FC<BooksSearchInputProps> = observer((props) => {
  const { className } = props;
  const { searchTerm, searchTermErrorMsg, setSearchTerm } = useBooksPageStore();

  return (
    <Input
      className={cnBooksSearchInput(undefined, [className])}
      error={searchTermErrorMsg}
      fullWidth
      onChange={(value) => setSearchTerm(String(value))}
      value={searchTerm}
    />
  );
});
