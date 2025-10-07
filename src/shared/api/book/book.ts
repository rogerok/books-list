import { apiClient } from '@shared/api/client.ts';
import {
  type BookCreateRequestModel,
  type BookDeleteRequestModel,
  type BookGetListRequestModel,
  type BookNotesUpdateRequestModel,
  type BookProgressUpdateModel,
  type BooksGetLastRatedRequestModel,
  type BookStatusUpdateRequestModel,
  type UserBookRequestModel,
} from '@shared/models/book.ts';

export const createUserBook = async (data: UserBookRequestModel) => {
  return apiClient
    .from('userBooks')
    .insert({
      bookId: data.bookId,
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
      insearchterm: data.searchTerm,
      instatus: data.status,
      inuserid: data.userId,
    })
    .throwOnError();
};

export const getLastRatedBooks = async (
  data: BooksGetLastRatedRequestModel,
) => {
  return apiClient
    .rpc('getRecentRated', {
      plimit: data.limit,
      puserid: data.userId,
    })
    .throwOnError();
};

export const deleteBook = async (data: BookDeleteRequestModel) => {
  return apiClient
    .from('userBooks')
    .delete()
    .eq('bookId', data.bookId)
    .eq('userId', data.userId)
    .throwOnError();
};
