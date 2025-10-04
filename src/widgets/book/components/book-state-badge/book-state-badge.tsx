import './book-state-badge.scss';
import type { BookStateType } from '@shared/models/book.ts';
import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { Badge } from '@shared/ui/badge/badge.tsx';
import { HStack } from '@shared/ui/hstack/hstack.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';

const cnBookStateBadge = cn('BookStateBadge');

interface BookStateBadgeProps {
  state: BookStateType;
  className?: string;
}

const getContent = (state: BookStateType) => {
  switch (state) {
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
              className={cnBookStateBadge('Title', {
                state: state,
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
              className={cnBookStateBadge('Title', {
                state: state,
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
              className={cnBookStateBadge('Title', {
                state: state,
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

export const BookStateBadge: FC<BookStateBadgeProps> = (props) => {
  const { className, state } = props;

  return (
    <HStack
      align={'center'}
      className={cnBookStateBadge(undefined, [className])}
      gap={'8'}
    >
      {getContent(state)}
    </HStack>
  );
};
