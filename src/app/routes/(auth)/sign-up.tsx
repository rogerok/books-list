import { SignUpPage } from '@pages/sign-up/components/sign-up-page.tsx';
import { routes } from '@shared/config/router/routes.ts';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/sign-up')({
  // beforeLoad: () => {
  //   throw redirect({
  //     to: routes.home(),
  //   });
  // },
  component: SignUpPage,
});
