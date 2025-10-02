import { cn } from '@bem-react/classname';
import { Card } from '@shared/ui/card/card.tsx';
import { BookWidgetCompact } from '@widgets/book/components/book-widget-compact/book-widget-compact.tsx';
import { BookWidgetWide } from '@widgets/book/components/book-widget-wide/book-widget-wide.tsx';
import { type FC, useMemo } from 'react';

const cnBookWidget = cn('BookWidget');

export type BookWidgetMockData = {
  author: string;
  genre: string;
  img: string;
  progress: number;
  title: string;
};

const mockData: BookWidgetMockData = {
  author: 'Мэтт Хейг',
  genre: 'Художественная литература',
  img: '',
  progress: 30,
  title: 'Полуночная библиотека',
};

interface BookWidgetProps {
  variant: 'card' | 'compact' | 'wide';
  className?: string;
}

export const BookWidget: FC<BookWidgetProps> = (props) => {
  const { className, variant } = props;

  const component = useMemo(() => {
    switch (variant) {
      case 'compact':
        return <BookWidgetCompact data={mockData} />;
      case 'wide':
        return <BookWidgetWide data={mockData} />;
    }
  }, [variant]);

  return (
    <Card className={cnBookWidget(undefined, [className])} elevation={'sm'}>
      {component}
    </Card>
  );
};
