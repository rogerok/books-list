import type { FC } from 'react';

import { SignUpForm } from '@pages/sign-up/components/sign-up-form/sign-up-form.tsx';
import { SignUpInfoPanel } from '@pages/sign-up/components/sign-up-info-panel/sign-up-info-panel.tsx';
import { SignLayout } from '@shared/layouts/sign-layout/sign-layout.tsx';
import { useRootStore } from '@shared/stores/root-store/root-store.ts';
import { observer } from 'mobx-react-lite';

export const SignUpPage: FC = observer(() => {
  const { screen } = useRootStore();

  return (
    <SignLayout
      form={<SignUpForm />}
      infoPanel={screen.upMd && <SignUpInfoPanel />}
    />
  );
});
