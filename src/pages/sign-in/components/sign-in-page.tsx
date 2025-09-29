import { SignInForm } from '@pages/sign-in/components/sign-in-form/sign-in-form.tsx';
import { SignInInfoPanel } from '@pages/sign-in/components/sign-in-info-panel/sign-in-info-panel.tsx';
import { SignLayout } from '@shared/layouts/sign-layout/sign-layout.tsx';
import { screenStore } from '@shared/stores/screen-store.ts';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

export const SignInPage: FC = observer(() => {
  return (
    <SignLayout
      form={<SignInForm />}
      infoPanel={screenStore.upMd && <SignInInfoPanel />}
    />
  );
});
