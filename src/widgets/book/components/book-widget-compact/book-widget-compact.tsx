import type { BookWidgetMockData } from '@widgets/book/components/book-widget.tsx';
import type { FC } from 'react';

import './book-widget-compact.scss';
import { cn } from '@bem-react/classname';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { BookProgress } from '@widgets/book/components/book-progress/book-progress.tsx';

const cnBookWidgetCompact = cn('BookWidgetCompact');

interface BookWidgetCompactProps {
  data: BookWidgetMockData;
  className?: string;
}

export const BookWidgetCompact: FC<BookWidgetCompactProps> = (props) => {
  const { className, data } = props;
  return (
    <div className={cnBookWidgetCompact(undefined, [className])}>
      <Typography as={'h5'} size={'2xs'} weight={'medium'}>
        {data.title}
      </Typography>
      <Typography gutterBottom size={'3xs'} variant={'secondary'}>
        {data.author}
      </Typography>
      <BookProgress percent={data.progress} />
    </div>
  );
};
