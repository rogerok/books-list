import { HomePage } from '@pages/home/home-page.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(dashboard)/home')({
  component: () => <HomePage />,
});
