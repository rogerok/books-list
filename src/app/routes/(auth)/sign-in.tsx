import { SignInPage } from '@pages/sign-in';
import { routes } from '@shared/config/router/routes.ts';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: () => {
    throw redirect({
      to: routes.dashboard(),
    });
  },
  component: SignInPage,
});
