import { cn } from '@bem-react/classname';

import './sign-in-page.scss';
import { SignInForm } from '@pages/sign-in/components/sign-in-form/sign-in-form.tsx';
import { SignInInfoPanel } from '@pages/sign-in/components/sign-in-info-panel/sign-in-info-panel.tsx';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

const cnSignInPage = cn('SignInPage');

export const SignInPage: FC = observer(() => {
  return (
    <main className={cnSignInPage()}>
      <div className={cnSignInPage('Content')}>
        <SignInInfoPanel className={cnSignInPage('InfoPanel')} />
        <SignInForm className={cnSignInPage('Form')} />
      </div>
    </main>
  );
});
