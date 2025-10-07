import { cn } from '@bem-react/classname';

import './book-details-content.scss';
import { BookDetailsActionButtons } from '@pages/book-details/components/book-details-action-buttons/book-details-action-buttons.tsx';
import { BookHero } from '@pages/book-details/components/book-hero/book-hero.tsx';
import { BookNotes } from '@pages/book-details/components/book-notes/book-notes.tsx';
import { BookProgress } from '@pages/book-details/components/book-progress/book-progress.tsx';
import { BookRating } from '@pages/book-details/components/book-rating/book-rating.tsx';
import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { Card } from '@shared/ui/card/card.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { getRouteApi } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const cnBookDetailsContent = cn('BookDetailsContent');

const route = getRouteApi('/_protected/(dashboard)/books/$bookId');

export const BookDetailsContent = observer(() => {
  const params = route.useParams();

  const { clear, fetchBook } = useBookDetailsStore();

  useEffect(() => {
    fetchBook(params.bookId);

    return () => {
      clear();
    };
  }, [clear, fetchBook, params.bookId]);

  return (
    <section className={cnBookDetailsContent()}>
      <BookHero className={cnBookDetailsContent('Header')} />

      <div className={cnBookDetailsContent('Cards')}>
        <VStack className={cnBookDetailsContent('Col')} gap={'32'}>
          <Card className={cnBookDetailsContent('Card')} elevation={'md'}>
            <BookRating />
          </Card>
          <Card className={cnBookDetailsContent('Card')}>
            <BookProgress />
          </Card>
          <BookDetailsActionButtons />
        </VStack>
        <VStack className={cnBookDetailsContent('Col')}>
          <div className={cnBookDetailsContent('Card')}>
            <BookNotes />
          </div>
        </VStack>
      </div>
    </section>
  );
});
