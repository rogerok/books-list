import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/(dashboard)')({
  component: () => (
    <div>
      <div>header</div>
      <div>sidebar</div>
      <Outlet />
    </div>
  ),
});
