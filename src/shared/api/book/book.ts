import type {
  BookCreateRequestModel,
  UserBookRequestModel,
} from '@shared/models/book.ts';

import { apiClient } from '@shared/api/client.ts';

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
    .from('viewUserBookDetails')
    .select('*')
    .eq('bookId', bookId)
    .eq('userId', userId)
    .single()
    .throwOnError();
};
