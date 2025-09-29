import type { FC } from 'react';

import { createRootRoute, Outlet } from '@tanstack/react-router';

const RootLayout: FC = () => (
  <>
    <Outlet />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
