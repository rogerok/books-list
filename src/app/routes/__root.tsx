import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link className="[&.active]:font-bold" to="/">
        Home
      </Link>{' '}
      <Link className="[&.active]:font-bold" to="/about">
        About
      </Link>
    </div>
    <hr />
    <Outlet />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
