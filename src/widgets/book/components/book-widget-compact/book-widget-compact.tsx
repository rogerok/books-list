import './book-widget-compact.scss';
import type { BookResponseModel } from '@shared/models/book.ts';
import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { routes } from '@shared/config/router/routes.ts';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { BookProgress } from '@widgets/book/components/book-progress/book-progress.tsx';

const cnBookWidgetCompact = cn('BookWidgetCompact');

interface BookWidgetCompactProps {
  data: BookResponseModel;
  className?: string;
}

export const BookWidgetCompact: FC<BookWidgetCompactProps> = (props) => {
  const { className, data } = props;

  return (
    <div className={cnBookWidgetCompact(undefined, [className])}>
      <AppLink
        params={{
          bookId: data.bookId,
        }}
        to={routes.bookDetails()}
      >
        <Typography as={'h5'} clamp size={'2xs'} weight={'medium'}>
          {data.title}
        </Typography>

        <Typography clamp gutterBottom size={'3xs'} variant={'secondary'}>
          {data.author}
        </Typography>
        <BookProgress percent={data.progress ?? 0} />
      </AppLink>
    </div>
  );
};
