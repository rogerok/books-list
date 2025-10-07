import type { BookResponseModel } from '@shared/models/book.ts';
import type { FC } from 'react';

import './book-widget-card.scss';
import { cn } from '@bem-react/classname';
import { routes } from '@shared/config/router/routes.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { AppImage } from '@shared/ui/app-image/app-image.tsx';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { BookProgress } from '@widgets/book/components/book-progress/book-progress.tsx';
import { BookStatusBadge } from '@widgets/book/components/book-status-badge/book-status-badge.tsx';

const cnBookWidgetCard = cn('BookWidgetCard');

interface BookWidgetCardProps {
  data: BookResponseModel;
  className?: string;
}

const BookWidgetCard: FC<BookWidgetCardProps> = (props) => {
  const { className, data } = props;

  const hasRating = !!data.rating && data.rating >= 0;

  return (
    <VStack className={cnBookWidgetCard(undefined, [className])} gap={'16'}>
      {data.coverUrl ? (
        <div className={cnBookWidgetCard('Cover')}>
          <AppImage
            alt={data.title}
            className={cnBookWidgetCard('Img')}
            fallback={<Skeleton height={238} rounded={'14'} />}
            fit={'cover'}
            height={238}
            rounded={'10'}
            src={data.coverUrl}
          />
        </div>
      ) : (
        <Typography
          className={cnBookWidgetCard('CoverFallback')}
          size={'sm'}
          weight={'medium'}
        >
          🖼️ Обложка отсутствует
        </Typography>
      )}

      <VStack gap={'12'}>
        <AppLink
          params={{
            bookId: data.bookId,
          }}
          to={routes.bookDetails()}
        >
          <VStack as={'p'} gap={'4'}>
            <Typography
              className={cnBookWidgetCard('Text')}
              size={'md'}
              weight={'medium'}
            >
              {data.title}
            </Typography>
            <Typography
              className={cnBookWidgetCard('Text')}
              size={'sm'}
              variant={'secondary'}
            >
              {data.author}
            </Typography>
            {data.genreName && (
              <Typography
                className={cnBookWidgetCard('Text')}
                size={'2xs'}
                variant={'secondary'}
              >
                {data.genreName}
              </Typography>
            )}
          </VStack>
        </AppLink>

        <BookStatusBadge status={data.status} />
        {hasRating ? (
          <HStack gap={'4'}>
            <Typography variant={'secondary'}>{data.rating}</Typography>
            <IconComponent
              color={ColorConstant.Orange200}
              name={'starFilledIcon'}
              size={'xxs'}
            />
          </HStack>
        ) : (
          <Typography size={'xs'} variant={'secondary'}>
            Вы ещё не оценивали книгу
          </Typography>
        )}
        <BookProgress percent={data.progress} />
      </VStack>
    </VStack>
  );
};
export default BookWidgetCard;
