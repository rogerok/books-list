import type { BookWidgetMockData } from '@widgets/book/components/book-widget.tsx';
import type { FC } from 'react';

import './book-widget-wide.scss';

import { cn } from '@bem-react/classname';
import { AppImage } from '@shared/ui/app-image/app-image.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { BookProgress } from '@widgets/book/components/book-progress/book-progress.tsx';

const cnBookWidgetWide = cn('BookWidgetWide');

interface BookWidgetWideProps {
  data: BookWidgetMockData;
  className?: string;
}

export const BookWidgetWide: FC<BookWidgetWideProps> = (props) => {
  const { className, data } = props;

  return (
    <Card className={cnBookWidgetWide(undefined, [className])} elevation={'sm'}>
      {data.img && (
        <AppImage
          alt={`Обложка книги ${data.title}`}
          className={cnBookWidgetWide('Cover')}
          rounded={'10'}
          src={data.img}
        />
      )}

      <div className={cnBookWidgetWide('Info')}>
        <div>
          <Typography as={'h5'} size={'md'} weight={'medium'}>
            {data.title}
          </Typography>
          <Typography size={'xs'} variant={'secondary'}>
            {data.author}
          </Typography>
        </div>
        <BookProgress percent={data.progress} />
      </div>
    </Card>
  );
};
