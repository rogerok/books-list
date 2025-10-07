import { BooksPage } from '@pages/books/components/books-page.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/(dashboard)/books/')({
  component: BooksPage,
});
