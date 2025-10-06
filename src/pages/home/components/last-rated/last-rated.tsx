import { cn } from '@bem-react/classname';
import { LastRatedStore } from '@pages/home/stores/last-rated-store.ts';

import './last-rated.scss';
import { routes } from '@shared/config/router/routes.ts';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import {
  BookStatusEnumSchema,
  type BookStatusType,
} from '@shared/models/book.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { AppLink } from '@shared/ui/app-link/app-link.tsx';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';
import { type FC, useEffect, useState } from 'react';

const cnLastActivity = cn('LastRated');

const labelsMap: Record<BookStatusType, string> = {
  read: 'Прочитано',
  reading: 'Читаю',
  toRead: 'К чтению',
};

interface LastActivityProps {
  className?: string;
}

export const LastRated: FC<LastActivityProps> = observer((props) => {
  const { className } = props;
  const { user } = useRootStore();

  const [store] = useState(() => new LastRatedStore(user));

  const { data, fetchLastRated, isLoading } = store;

  useEffect(() => {
    fetchLastRated();
  }, [fetchLastRated, user.id]);

  if (isLoading) {
    return (
      <ul className={cnLastActivity(undefined, [className])}>
        <Skeleton height={80} rounded={'16'} />
        <Skeleton height={80} rounded={'16'} />
      </ul>
    );
  }

  return (
    !!data.length && (
      <ul className={cnLastActivity(undefined, [className])}>
        {data.map((book, idx) => {
          const validStatus = BookStatusEnumSchema.safeParse(book.status).data;

          return (
            <li className={cnLastActivity('Item')} key={idx}>
              <Card
                className={cnLastActivity('ItemInner', {
                  status: validStatus,
                })}
                elevation={'sm'}
              >
                <VStack>
                  {validStatus && (
                    <AppLink
                      params={{
                        bookId: book.userBookId,
                      }}
                      to={routes.bookDetails()}
                    >
                      <Typography as={'h6'} size={'sm'} weight={'medium'}>
                        {labelsMap[validStatus]} {book.title}
                      </Typography>
                    </AppLink>
                  )}
                  <Typography size={'2xs'} variant={'secondary'}>
                    {book.author}
                  </Typography>
                </VStack>
                <div className={cnLastActivity('Rating')}>
                  <IconComponent
                    color={ColorConstant.Orange200}
                    name={'starFilledIcon'}
                    size={'xxxs'}
                  />
                  <Typography size={'xs'} variant={'secondary'}>
                    {book.rating}
                  </Typography>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    )
  );
});
