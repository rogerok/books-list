import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
  '/_protected/(dashboard)/books/$bookId',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello `_protected/(dashboard)/books/$bookId!`</div>;
}
