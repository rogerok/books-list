import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/(dashboard)/books/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello `/_protected/(dashboard)/library!`</div>;
}
