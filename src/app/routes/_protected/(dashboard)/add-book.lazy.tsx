import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/(dashboard)/add-book')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello `/_protected/(dashboard)/add-book`!</div>;
}
