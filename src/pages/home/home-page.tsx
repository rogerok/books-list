import type { FC } from 'react';

import { cn } from '@bem-react/classname';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { observer } from 'mobx-react-lite';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = observer((props) => {
  const { auth } = useRootStore();

  return (
    <div className={cnHomePage(undefined, [props.className])}>
      HomePage
      <Button onClick={auth.logout}>logout</Button>
    </div>
  );
});
