import './book-widget-wide.scss';

import type { BookResponseModel } from '@shared/models/book.ts';
import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { routes } from '@shared/config/router/routes.ts';
import { AppImage } from '@shared/ui/app-image/app-image.tsx';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { BookProgress } from '@widgets/book/components/book-progress/book-progress.tsx';

const cnBookWidgetWide = cn('BookWidgetWide');

interface BookWidgetWideProps {
  data: BookResponseModel;
  className?: string;
}

export const BookWidgetWide: FC<BookWidgetWideProps> = (props) => {
  const { className, data } = props;

  return (
    data && (
      <Card
        className={cnBookWidgetWide(undefined, [className])}
        elevation={'sm'}
      >
        {data.coverUrl && (
          <AppImage
            alt={`Обложка книги ${data.title}`}
            className={cnBookWidgetWide('Cover')}
            height={144}
            rounded={'10'}
            src={data.coverUrl}
            width={96}
          />
        )}

        <div className={cnBookWidgetWide('Info')}>
          <div>
            <AppLink
              params={{
                bookId: data.bookId,
              }}
              to={routes.bookDetails()}
            >
              <Typography as={'h5'} clamp size={'md'} weight={'medium'}>
                {data.title}
              </Typography>
            </AppLink>

            <Typography clamp size={'xs'} variant={'secondary'}>
              {data.author}
            </Typography>
          </div>
          <BookProgress percent={data.progress ?? 0} />
        </div>
      </Card>
    )
  );
};
