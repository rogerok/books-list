import type { FC } from 'react';

import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { StarRating } from '@shared/ui/star-rating/start-rating.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { observer } from 'mobx-react-lite';

interface BookRatingProps {
  className?: string;
}

export const BookRating: FC<BookRatingProps> = observer(() => {
  const { data, isLoading, updateRating } = useBookDetailsStore();

  if (isLoading) {
    return <Skeleton height={80} />;
  }

  return (
    <>
      <Typography as={'h6'} size={'lg'} weight={'medium'}>
        Рейтинг
      </Typography>
      <StarRating onSelect={updateRating} selectedStars={data?.rating ?? 0} />
      <Typography size={'2xs'} variant={'secondary'}>
        {data?.rating && data?.rating > 0
          ? `Вы оценили книгу на ${data.rating} из 5`
          : 'Вы ещё не оценивали книгу'}
      </Typography>
    </>
  );
});
