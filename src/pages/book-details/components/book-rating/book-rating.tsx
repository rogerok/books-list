import type { FC } from 'react';

import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { StarRating } from '@shared/ui/star-rating/start-rating.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { observer } from 'mobx-react-lite';

interface BookRatingProps {
  className?: string;
}

interface BookRatingLabelProps {
  rating: number | null;
}

const BookRatingLabel: FC<BookRatingLabelProps> = (props) => {
  const { rating } = props;

  return (
    rating && (
      <Typography size={'2xs'} variant={'secondary'}>
        Вы оценили книгу на {rating} из 5
      </Typography>
    )
  );
};

export const BookRating: FC<BookRatingProps> = observer(() => {
  const { data, isLoading, rating, updateRating } = useBookDetailsStore();

  if (isLoading) {
    return <Skeleton height={80} />;
  }

  return (
    data && (
      <>
        <Typography as={'h6'} size={'lg'} weight={'medium'}>
          Рейтинг
        </Typography>
        <StarRating onSelect={updateRating} selectedStars={rating} />
        <BookRatingLabel rating={rating} />
      </>
    )
  );
});
