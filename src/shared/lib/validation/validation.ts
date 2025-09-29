import * as z from 'zod';
import { ru } from 'zod/locales';

export const setErrorMap = () => z.config(ru());

setErrorMap();

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%^&*?_+=\-{}[\]:;"'<>,.()|\\`~/])[A-Za-z\d#$@!%^&*?_+=\-{}[\]:;"'<>,.()|\\`~/]{8,30}$/;
