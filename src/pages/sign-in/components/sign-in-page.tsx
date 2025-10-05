import { SignInForm } from '@pages/sign-in/components/sign-in-form/sign-in-form.tsx';
import { SignInInfoPanel } from '@pages/sign-in/components/sign-in-info-panel/sign-in-info-panel.tsx';
import { SignLayout } from '@shared/layouts/sign-layout/sign-layout.tsx';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';

export const SignInPage: FC = observer(() => {
  const { screen } = useRootStore();

  return (
    <SignLayout
      form={<SignInForm />}
      infoPanel={screen.upMd && <SignInInfoPanel />}
    />
  );
});
