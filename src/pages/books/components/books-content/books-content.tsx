import { cn } from '@bem-react/classname';
import { BooksList } from '@pages/books/components/books-list/books-list.tsx';
import { BooksSearchInput } from '@pages/books/components/books-search-input/books-search-input.tsx';
import { BooksTabs } from '@pages/books/components/books-tabs/books-tabs.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

const cnBooksContent = cn('BooksContent');

interface BooksContentProps {
  className?: string;
}

export const BooksContent: FC<BooksContentProps> = observer((props) => {
  return (
    <VStack className={cnBooksContent(undefined, [props.className])} gap={'32'}>
      <BooksSearchInput />
      <BooksTabs />
      <BooksList />
    </VStack>
  );
});
