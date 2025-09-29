import { cn } from '@bem-react/classname';

import './sign-in-page.scss';
import { SignInForm } from '@pages/sign-in/components/sign-in-form/sign-in-form';
import { SignInInfoPanel } from '@pages/sign-in/components/sign-in-info-panel/sign-in-info-panel';
import { screenStore } from '@shared/stores/screen-store.ts';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

const cnSignInPage = cn('SignInPage');

export const SignInPage: FC = observer(() => {
  return (
    <main className={cnSignInPage()}>
      <div className={cnSignInPage('Content')}>
        {screenStore.upMd && (
          <SignInInfoPanel className={cnSignInPage('InfoPanel')} />
        )}
        <SignInForm className={cnSignInPage('Form')} />
      </div>
    </main>
  );
});
