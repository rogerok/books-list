import * as z from 'zod';
import { ru } from 'zod/locales';

export const setErrorMap = () => z.config(ru());

setErrorMap();
