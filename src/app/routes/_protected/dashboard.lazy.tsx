import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/dashboard')({
  component: () => <div>Hello, World!</div>,
});
