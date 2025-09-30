import type { FC } from 'react';

import { SignUpForm } from '@pages/sign-up/components/sign-up-form/sign-up-form.tsx';
import { SignUpInfoPanel } from '@pages/sign-up/components/sign-up-info-panel/sign-up-info-panel.tsx';
import { SignUpStoreProvider } from '@pages/sign-up/stores/sign-up-store.ts';
import { SignLayout } from '@shared/layouts/sign-layout/sign-layout.tsx';
import { screenStore } from '@shared/stores/screen-store.ts';
import { observer } from 'mobx-react-lite';

export const SignUpPage: FC = observer(() => {
  return (
    <SignUpStoreProvider>
      <SignLayout
        form={<SignUpForm />}
        infoPanel={screenStore.upMd && <SignUpInfoPanel />}
      />
    </SignUpStoreProvider>
  );
});
