import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = observer((props) => {
  return (
    <div className={cnHomePage(undefined, [props.className])}>HomePage</div>
  );
});
