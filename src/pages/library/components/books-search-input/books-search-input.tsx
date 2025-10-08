import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { useLibraryPageStore } from '@pages/library/stores/library-page-store.ts';
import { Input } from '@shared/ui/input/input.tsx';
import { observer } from 'mobx-react-lite';

const cnBooksSearchInput = cn('BooksSearchInput');

interface BooksSearchInputProps {
  className?: string;
}

export const BooksSearchInput: FC<BooksSearchInputProps> = observer((props) => {
  const { className } = props;
  const { searchTerm, searchTermErrorMsg, setSearchTerm } =
    useLibraryPageStore();

  return (
    <Input
      className={cnBooksSearchInput(undefined, [className])}
      error={searchTermErrorMsg}
      fullWidth
      onChange={(value) => setSearchTerm(String(value))}
      placeholder={'Поиск книги или автора'}
      value={searchTerm}
    />
  );
});
