import { routes } from '@shared/config/router/routes.ts';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: routes.dashboard(),
    });
  },
});
