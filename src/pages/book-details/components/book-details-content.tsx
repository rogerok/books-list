import { cn } from '@bem-react/classname';

import './book-details-content.scss';
import { BookHero } from '@pages/book-details/components/book-hero/book-hero.tsx';
import { BookNotes } from '@pages/book-details/components/book-notes/book-notes.tsx';
import { BookProgress } from '@pages/book-details/components/book-progress/book-progress.tsx';
import { BookRating } from '@pages/book-details/components/book-rating/book-rating.tsx';
import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { getRouteApi } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const cnBookDetailsContent = cn('BookDetailsContent');

const route = getRouteApi('/_protected/(dashboard)/books/$bookId');

export const BookDetailsContent = observer(() => {
  const params = route.useParams();

  const { destroy, fetchBook, markAsRead } = useBookDetailsStore();

  useEffect(() => {
    fetchBook(params.bookId);

    return () => {
      destroy();
    };
  }, [destroy, fetchBook, params.bookId]);

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
          <Button
            addonLeft={
              <IconComponent
                color={ColorConstant.White}
                name={'doneIcon'}
                size={'xxs'}
              />
            }
            fullWidth
            onClick={markAsRead}
            variant={'accent'}
          >
            Прочитано
          </Button>
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
