import { cn } from '@bem-react/classname';

import './book-details-page.scss';
import { BookNotes } from '@pages/book-details/components/book-notes/book-notes.tsx';
import { BookProgress } from '@pages/book-details/components/book-progress/book-progress.tsx';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { StarRating } from '@shared/ui/star-rating/start-rating.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { BookWidget } from '@widgets/book';

const cnBookDetailsPage = cn('BookDetailsPage');

export const BookDetailsPage = () => {
  const mockRating = 1;

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
};
