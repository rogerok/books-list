import type { StringValidation } from 'zod';

import { ValidationMessages } from '@shared/constants/validation-messages.ts';
import * as z from 'zod';

export const getInvalidStringErrorMessage = (
  validation: StringValidation,
  isFieldFilled: boolean,
): string => {
  let errorMessage = ValidationMessages.required();

  switch (validation) {
    case 'email':
      errorMessage = isFieldFilled
        ? ValidationMessages.invalidEmail()
        : ValidationMessages.emailRequired();
      break;
  }

  return errorMessage;
};

export const setZodErrorMap = (): void =>
  z.setErrorMap((error, ctx) => {
    let errorMessage = ctx.defaultError;

    switch (error.code) {
      case z.ZodIssueCode.custom:
        errorMessage = ValidationMessages.invalidData();
        break;

      case z.ZodIssueCode.invalid_type:
        errorMessage =
          ctx.data === null ? ValidationMessages.required() : ctx.defaultError;
        break;

      case z.ZodIssueCode.too_small:
        if (error.minimum === 1) {
          errorMessage = ValidationMessages.required();
        } else {
          errorMessage = ValidationMessages.minLength(Number(error.minimum));
        }
        break;

      case z.ZodIssueCode.too_big:
        if (error.type === 'number') {
          errorMessage = ValidationMessages.maxNumber(Number(error.maximum));
        } else {
          errorMessage = ValidationMessages.maxLength(Number(error.maximum));
        }
        break;

      case z.ZodIssueCode.invalid_string:
        errorMessage = getInvalidStringErrorMessage(
          error.validation,
          !!ctx.data,
        );
        break;
    }

    return {
      message: errorMessage,
    };
  });

setZodErrorMap();

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%^&*?_+=\-{}[\]:;"'<>,.()|\\`~/])[A-Za-z\d#$@!%^&*?_+=\-{}[\]:;"'<>,.()|\\`~/]{8,30}$/;
