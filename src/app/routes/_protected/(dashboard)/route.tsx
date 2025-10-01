import { MainLayout } from '@shared/layouts/main-layout/main-layout.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(dashboard)')({
  component: () => <MainLayout />,
});
