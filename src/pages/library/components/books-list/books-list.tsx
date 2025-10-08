import { cn } from '@bem-react/classname';
import { useLibraryPageStore } from '@pages/library/stores/library-page-store.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { ElementRepeater } from '@shared/ui/element-repeater/element-repeater.tsx';

import './books-list.scss';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { BookWidget } from '@widgets/book';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect } from 'react';

const cnBooksList = cn('BooksList');

interface BooksListProps {
  className?: string;
}

export const BooksList: FC<BooksListProps> = observer((props) => {
  const { className } = props;

  const { data, fetchBooks, isBooksLoading, tabManager } =
    useLibraryPageStore();

  useEffect(() => {
    fetchBooks(tabManager.activeTab);
  }, [fetchBooks, tabManager.activeTab]);

  if (isBooksLoading) {
    return (
      <ul className={cnBooksList(undefined, [className])}>
        <ElementRepeater count={4}>
          <Skeleton
            className={cnBooksList('Item')}
            height={280}
            rounded={'14'}
          />
        </ElementRepeater>
      </ul>
    );
  }

  if (!data.length) {
    return (
      <VStack align={'center'} gap={'32'}>
        <IconComponent
          color={ColorConstant.Green200}
          name={'bookIcon'}
          size={'lg'}
        />
        <Typography size={'md'} weight={'medium'}>
          Книги отсутствуют
        </Typography>
      </VStack>
    );
  }

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
