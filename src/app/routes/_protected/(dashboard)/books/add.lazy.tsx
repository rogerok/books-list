import { AddBookPage } from '@pages/add-book';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/(dashboard)/books/add')({
  component: AddBookPage,
});
