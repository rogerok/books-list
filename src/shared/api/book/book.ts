import { apiClient } from '@shared/api/client.ts';
import {
  type BookCreateRequestModel,
  type BookGetListRequestModel,
  type BookNotesUpdateRequestModel,
  type BookProgressUpdateModel,
  type BookStatusUpdateRequestModel,
  type UserBookRequestModel,
} from '@shared/models/book.ts';

export const createUserBook = async (data: UserBookRequestModel) => {
  return apiClient
    .from('userBooks')
    .insert({
      bookId: data.bookId,
      status: data.status,
      userId: data.userId,
    })
    .throwOnError();
};

export const createBook = async (data: BookCreateRequestModel) => {
  return apiClient
    .from('books')
    .insert({
      author: data.author,
      coverUrl: data.coverUrl,
      genreId: data.genre,
      title: data.title,
    })
    .select('id')
    .single()
    .throwOnError();
};

export const getBook = async (userId: string, bookId: string) => {
  return apiClient
    .rpc('getUserBook', {
      inbookid: bookId,
      inuserid: userId,
    })
    .single()
    .throwOnError();
};

export const updateBookRating = async (userBookId: string, rating: number) => {
  return apiClient
    .from('userBooks')
    .update({
      rating: rating,
    })
    .eq('bookId', userBookId)
    .select('rating')
    .single()
    .throwOnError();
};

export const setBookStatus = async (data: BookStatusUpdateRequestModel) => {
  return apiClient
    .from('userBooks')
    .update({
      status: data.status,
    })
    .eq('bookId', data.bookId)
    .select('status, progress')
    .single()
    .throwOnError();
};

export const updateBookProgress = async (data: BookProgressUpdateModel) => {
  return apiClient
    .from('userBooks')
    .update({
      progress: data.progress,
    })
    .eq('bookId', data.bookId)
    .select('status, progress')
    .single()
    .throwOnError();
};

export const updateBookNotes = async (data: BookNotesUpdateRequestModel) => {
  return apiClient
    .from('userBooks')
    .update({
      notes: data.notes,
    })
    .eq('bookId', data.bookId)
    .select('notes')
    .single()
    .throwOnError();
};

export const getBooks = async (data: BookGetListRequestModel) => {
  return apiClient
    .rpc('getUserBooks', {
      instatus: data.status,
      intitle: data.title,
      inuserid: data.userId,
    })
    .throwOnError();
};
