import './book-hero.scss';
import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { useBookDetailsStore } from '@pages/book-details/stores/book-details-store.ts';
import { AppImage } from '@shared/ui/app-image/app-image.tsx';
import { Badge } from '@shared/ui/badge/badge.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { BookStatusBadge } from '@widgets/book/components/book-status-badge/book-status-badge.tsx';
import { observer } from 'mobx-react-lite';

const cnBookHero = cn('BookHero');

interface BookHeroProps {
  className?: string;
}

export const BookHero: FC<BookHeroProps> = observer((props) => {
  const { className } = props;

  const { data, isLoading } = useBookDetailsStore();

  if (isLoading) {
    return <Skeleton height={200} rounded={'14'} />;
  }

  return (
    data && (
      <Card className={cnBookHero(undefined, [className])}>
        {data.coverUrl && (
          <AppImage
            alt={`Обложка книги ${data.title}`}
            className={cnBookHero('Cover')}
            height={320}
            rounded={'10'}
            src={data.coverUrl}
            width={224}
          />
        )}

        <div className={cnBookHero('Info')}>
          <Typography as={'h5'} size={'md'} weight={'medium'}>
            {data.title}
          </Typography>
          <Typography size={'xs'} variant={'secondary'}>
            {data.author}
          </Typography>
          {data.genreName && (
            <Badge
              background={'neutral-150'}
              className={cnBookHero('Genre')}
              rounded={'8'}
            >
              <Typography
                className={cnBookHero('GenreTitle')}
                size={'2xs'}
                weight={'medium'}
              >
                {data.genreName}
              </Typography>
            </Badge>
          )}

          <BookStatusBadge status={data.status} />
        </div>
      </Card>
    )
  );
});
