import type { BookWidgetMockData } from '@widgets/book/components/book-widget.tsx';
import type { FC } from 'react';

import './book-widget-hero.scss';
import { cn } from '@bem-react/classname';
import { AppImage } from '@shared/ui/app-image/app-image.tsx';
import { Badge } from '@shared/ui/badge/badge.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { BookStateBadge } from '@widgets/book/components/book-state-badge/book-state-badge.tsx';

const cnBookWidgetHero = cn('BookWidgetHero');

interface BookWidgetHeroProps {
  data: BookWidgetMockData;
  className?: string;
}

export const BookWidgetHero: FC<BookWidgetHeroProps> = (props) => {
  const { data } = props;

  return (
    <Card className={cnBookWidgetHero(undefined, [props.className])}>
      <AppImage
        alt={`Обложка книги ${data.title}`}
        className={cnBookWidgetHero('Cover')}
        height={320}
        rounded={'10'}
        src={'https://dummyjson.com/image/224x320'}
        width={224}
      />

      <div className={cnBookWidgetHero('Info')}>
        <Typography as={'h5'} size={'md'} weight={'medium'}>
          {data.title}
        </Typography>
        <Typography size={'xs'} variant={'secondary'}>
          {data.author}
        </Typography>
        <Badge
          background={'neutral-150'}
          className={cnBookWidgetHero('Genre')}
          rounded={'8'}
        >
          <Typography
            className={cnBookWidgetHero('GenreTitle')}
            size={'2xs'}
            weight={'medium'}
          >
            {data.genre}
          </Typography>
        </Badge>
        <BookStateBadge state={'read'} />
      </div>
    </Card>
  );
};
