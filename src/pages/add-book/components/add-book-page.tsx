import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { AddBookForm } from '@pages/add-book/components/add-book-form/add-book-form.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';

const cnAddBookPage = cn('AddBookPage');

export const AddBookPage: FC = () => {
  return (
    <VStack align={'center'} className={cnAddBookPage()}>
      <AddBookForm />
    </VStack>
  );
};
