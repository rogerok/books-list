import './book-details-content.scss';
import { BookDetailsContent } from '@pages/book-details/components/book-details-content.tsx';
import { BookDetailsStoreProvider } from '@pages/book-details/stores/book-details-store.ts';
import { observer } from 'mobx-react-lite';

export const BookDetailsPage = observer(() => {
  return (
    <BookDetailsStoreProvider>
      <BookDetailsContent />
    </BookDetailsStoreProvider>
  );
});
