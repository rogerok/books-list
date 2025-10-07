import './header.scss';
import { cn } from '@bem-react/classname';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { useHeaderTitle } from '@widgets/header/hooks/useHeaderTitle.ts';
import { observer } from 'mobx-react-lite';
import React from 'react';

const cnHeader = cn('Header');

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = observer((props) => {
  const { className } = props;

  const { navbar } = useRootStore();
  const title = useHeaderTitle();

  return (
    <header className={cnHeader(undefined, [className])}>
      <IconComponent
        className={cnHeader('Burger')}
        name={'burgerMenuIcon'}
        onClick={navbar.open}
        size={'md'}
      />

      <Typography
        as={'h2'}
        className={cnHeader('Title')}
        size={'xl'}
        weight={'semibold'}
      >
        {title ?? 'Book Tracker'}
      </Typography>
    </header>
  );
});
