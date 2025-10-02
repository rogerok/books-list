import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';

import './last-activity.scss';
import { Card } from '@shared/ui/card/card.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';

const cnLastActivity = cn('LastActivity');

type BookStatus = 'read' | 'reading' | 'toRead';

type MockData = {
  author: string;
  name: string;
  rating: number | null;
  status: BookStatus;
};

const labelsMap: Record<BookStatus, string> = {
  read: 'Прочитано',
  reading: 'Читаю',
  toRead: 'К чтению',
};

interface LastActivityProps {
  className?: string;
}

const data: MockData[] = [
  {
    author: 'Джейн Остин',
    name: 'Гордость и предубеждение',
    rating: 5,
    status: 'read',
  },
  {
    author: 'Скотт',
    name: 'Великий Гэтсби',
    rating: 4,
    status: 'toRead',
  },
];

export const LastActivity: FC<LastActivityProps> = observer((props) => {
  const { className } = props;

  return (
    <ul className={cnLastActivity(undefined, [className])}>
      {data.map((activity, idx) => (
        <li className={cnLastActivity('Item')} key={idx}>
          <Card
            className={cnLastActivity('ItemInner', {
              status: activity.status,
            })}
            elevation={'sm'}
          >
            <VStack>
              <Typography as={'h6'} size={'sm'} weight={'medium'}>
                {labelsMap[activity.status]} {activity.name}
              </Typography>
              <Typography size={'2xs'} variant={'secondary'}>
                {activity.author}
              </Typography>
            </VStack>
            <div className={cnLastActivity('Rating')}>
              <IconComponent
                color={ColorConstant.Orange200}
                name={'starFilledIcon'}
                size={'xxxs'}
              />
              <Typography size={'xs'} variant={'secondary'}>
                {activity.rating}
              </Typography>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
});
