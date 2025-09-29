import { SignUpPage } from '@pages/sign-up/components/sign-up-page.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUpPage,
});
