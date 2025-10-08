import type { FC } from 'react';

import './add-book-page.scss';
import { cn } from '@bem-react/classname';
import { AddBookForm } from '@pages/add-book/components/add-book-form/add-book-form.tsx';
import { GoalForm } from '@pages/add-book/components/goal-form/goal-form.tsx';
import { AddBookStoreProvider } from '@pages/add-book/store/add-book-store.ts';
import { Divider } from '@shared/ui/divider/divider.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';

const cnAddBookPage = cn('AddBookPage');

export const AddBookPage: FC = observer(() => {
  return (
    <VStack align={'center'} as={'section'} className={cnAddBookPage()}>
      <div className={cnAddBookPage('Content')}>
        <AddBookStoreProvider>
          <AddBookForm />
        </AddBookStoreProvider>
        <Divider flexItem />
        <GoalForm />
      </div>
    </VStack>
  );
});
