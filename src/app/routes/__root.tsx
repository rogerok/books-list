import { Typography } from '@shared/ui/typography/typography.tsx';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link className="[&.active]:font-bold" to="/">
        <Typography size={'3xs'}>Home</Typography>
      </Link>{' '}
    </div>
    <hr />
    <Outlet />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
