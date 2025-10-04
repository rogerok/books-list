import type { FC } from 'react';

import './add-book-page.scss';
import { cn } from '@bem-react/classname';
import { AddBookForm } from '@pages/add-book/components/add-book-form/add-book-form.tsx';
import { GoalForm } from '@pages/add-book/components/goal-form/goal-form.tsx';
import { Divider } from '@shared/ui/divider/divider.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';

const cnAddBookPage = cn('AddBookPage');

export const AddBookPage: FC = () => {
  return (
    <VStack align={'center'} as={'section'} className={cnAddBookPage()}>
      <div className={cnAddBookPage('Content')}>
        <AddBookForm />
        <Divider flexItem />
        <GoalForm />
      </div>
    </VStack>
  );
};
