import { z } from 'zod';

export const BookStateEnumSchema = z.enum(['read', 'reading', 'toRead']);
export type BookStateType = z.infer<typeof BookStateEnumSchema>;
