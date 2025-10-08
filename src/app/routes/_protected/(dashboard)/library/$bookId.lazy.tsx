import { BookDetailsPage } from '@pages/book-details';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
  '/_protected/(dashboard)/library/$bookId',
)({
  component: BookDetailsPage,
});
