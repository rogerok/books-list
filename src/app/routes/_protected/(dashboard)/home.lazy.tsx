import { HomePage } from '@pages/home/home-page.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/(dashboard)/home')({
  component: () => <HomePage />,
});
