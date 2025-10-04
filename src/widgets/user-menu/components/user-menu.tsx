import type { FC } from 'react';

import './user-menu.scss';

import { cn } from '@bem-react/classname';
import { ColorConstant } from '@shared/constants/style-system/colors.ts';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { Button } from '@shared/ui/button/button.tsx';
import { IconComponent } from '@shared/ui/icon-component/icon-component.tsx';
import { Skeleton } from '@shared/ui/skeleton/skeleton.tsx';
import { Typography } from '@shared/ui/typography/typography.tsx';
import { VStack } from '@shared/ui/vstack/vstack.tsx';
import { observer } from 'mobx-react-lite';

const cnUserMenu = cn('UserMenu');

interface UserMenuProps {
  className?: string;
}

export const UserMenu: FC<UserMenuProps> = observer((props) => {
  const { className } = props;

  const { auth, user } = useRootStore();

  return user.isLoading ? (
    <Skeleton height={'64'} rounded={'14'} />
  ) : (
    user.data && (
      <div className={cnUserMenu(undefined, [className])}>
        <div className={cnUserMenu('Avatar')}>
          <IconComponent
            color={ColorConstant.White}
            name={'accountIcon'}
            size={'xs'}
          />
        </div>

        <VStack as={'p'}>
          <Typography size={'sm'} weight={'medium'}>
            {user.data.name}
          </Typography>
          <Typography size={'3xs'} variant={'secondary'}>
            {user.data.email}
          </Typography>
        </VStack>
        <Button
          className={cnUserMenu('SignOutButton')}
          disabled={auth.isSigningOut}
          isLoading={auth.isSigningOut}
          onClick={auth.signOut}
          variant={'clear'}
        >
          <IconComponent
            color={ColorConstant.Neutral400}
            name={'signOutIcon'}
            size={'xxs'}
          />
        </Button>
      </div>
    )
  );
});
