import type { BookResponseModel } from '@shared/models/book.ts';

import { cn } from '@bem-react/classname';
import { Card } from '@shared/ui/card/card.tsx';
import { BookWidgetCompact } from '@widgets/book/components/book-widget-compact/book-widget-compact.tsx';
import { BookWidgetWide } from '@widgets/book/components/book-widget-wide/book-widget-wide.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useMemo } from 'react';

const cnBookWidget = cn('BookWidget');

interface BookWidgetProps {
  data: BookResponseModel;
  variant: 'card' | 'compact' | 'wide';
  className?: string;
}

export const BookWidget: FC<BookWidgetProps> = observer((props) => {
  const { className, data, variant } = props;

  const component = useMemo(() => {
    switch (variant) {
      case 'compact':
        return <BookWidgetCompact data={data} />;
      case 'wide':
        return <BookWidgetWide data={data} />;
    }
  }, [data, variant]);

  return (
    <Card className={cnBookWidget(undefined, [className])} elevation={'sm'}>
      {component}
    </Card>
  );
});
