import { cn } from '@bem-react/classname';

import './book-details-page.scss';
import { BookNotes } from '@pages/book-details/components/book-notes/book-notes.tsx';
import { BookProgress } from '@pages/book-details/components/book-progress/book-progress.tsx';
import { BookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { StarRating } from '@shared/ui/star-rating/start-rating.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { getRouteApi } from '@tanstack/react-router';
import { BookWidget } from '@widgets/book';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const cnBookDetailsPage = cn('BookDetailsPage');

const route = getRouteApi('/_protected/(dashboard)/books/$bookId');

export const BookDetailsPage = observer(() => {
  const mockRating = 1;
  const { user } = useRootStore();
  const params = route.useParams();
  const [store] = useState(() => new BookDetailsStore());

  useEffect(() => {
    if (user.id) {
      store.fetchBook(user.id, params.bookId);
    }
  }, []);

  return (
    <section className={cnBookDetailsPage()}>
      <BookWidget className={cnBookDetailsPage('Header')} variant={'hero'} />

      <div className={cnBookDetailsPage('Cards')}>
        <VStack className={cnBookDetailsPage('Col')} gap={'32'}>
          <Card className={cnBookDetailsPage('Card')} elevation={'md'}>
            <Typography as={'h6'} size={'lg'} weight={'medium'}>
              Рейтинг
            </Typography>
            <StarRating selectedStars={mockRating} />
            {mockRating && (
              <Typography size={'2xs'} variant={'secondary'}>
                Вы оценили книгу на {mockRating} из 5
              </Typography>
            )}
          </Card>
          <Card className={cnBookDetailsPage('Card')}>
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
            variant={'accent'}
          >
            Прочитано
          </Button>
        </VStack>
        <VStack className={cnBookDetailsPage('Col')}>
          <div className={cnBookDetailsPage('Card')}>
            <BookNotes />
          </div>
        </VStack>
      </div>
    </section>
  );
});
