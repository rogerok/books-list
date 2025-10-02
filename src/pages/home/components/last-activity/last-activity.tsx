import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { Card } from '@shared/ui/card/card.tsx';

import './last-activity.scss';
import { observer } from 'mobx-react-lite';

const cnLastActivity = cn('LastActivity');

type MockData = {
  author: string;
  name: string;
  rating: number | null;
};

interface LastActivityProps {
  className?: string;
}

const data: MockData[] = [
  {
    author: 'Джейн Остин',
    name: 'Гордость и предубеждение',
    rating: 5,
  },
  {
    author: 'Скотт',
    name: 'Великий Гэтсби',
    rating: 4,
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
              status: 'toRead',
            })}
            elevation={'sm'}
          >
            {activity.rating}
          </Card>
        </li>
      ))}
    </ul>
  );
});
