import { LibraryPage } from '@pages/library';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/(dashboard)/library/')({
  component: LibraryPage,
});
