import './book-status-badge.scss';
import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import {
  BookStatusEnumSchema,
  type BookStatusType,
} from '@shared/models/book.ts';
import { Badge } from '@shared/ui/badge/badge.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';

const cnBookStatusBadge = cn('BookStatusBadge');

interface BookStatusBadgeProps {
  status: string;
  className?: string;
}

const getContent = (status: BookStatusType) => {
  switch (status) {
    case 'reading':
      return (
        <>
          <IconComponent
            color={ColorConstant.Blue200}
            name={'bookIcon'}
            size={'xxs'}
          />
          <Badge background={'blue-100'} rounded={'8'} size={'unset'}>
            <Typography
              className={cnBookStatusBadge('Title', {
                status: status,
              })}
              size={'3xs'}
              weight={'medium'}
            >
              Читаю
            </Typography>
          </Badge>
        </>
      );
    case 'read':
      return (
        <>
          <IconComponent
            color={ColorConstant.Green500}
            name={'doneIcon'}
            size={'xxs'}
          />
          <Badge background={'blue-100'} rounded={'8'} size={'unset'}>
            <Typography
              className={cnBookStatusBadge('Title', {
                status: status,
              })}
              size={'3xs'}
              weight={'medium'}
            >
              Прочитано
            </Typography>
          </Badge>
        </>
      );
    case 'toRead':
      return (
        <>
          <IconComponent
            color={ColorConstant.Orange200}
            name={'clockIcon'}
            size={'xxs'}
          />
          <Badge background={'orange-100'} rounded={'8'} size={'unset'}>
            <Typography
              className={cnBookStatusBadge('Title', {
                status: status,
              })}
              size={'3xs'}
              weight={'medium'}
            >
              Запланировано
            </Typography>
          </Badge>
        </>
      );
  }
};

export const BookStatusBadge: FC<BookStatusBadgeProps> = (props) => {
  const { className, status } = props;

  // TODO: find out how get from supabase as enum
  const validStatus = BookStatusEnumSchema.safeParse(status).data;

  return (
    validStatus && (
      <HStack
        align={'center'}
        className={cnBookStatusBadge(undefined, [className])}
        gap={'8'}
      >
        {getContent(validStatus)}
      </HStack>
    )
  );
};
