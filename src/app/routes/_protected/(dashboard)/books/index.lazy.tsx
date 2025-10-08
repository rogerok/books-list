import { BooksPage } from '@pages/books';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/(dashboard)/books/')({
  component: BooksPage,
});
