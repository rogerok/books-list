import type { ObjectValues } from '@shared/utils/ts-utils/ts-utils';

export const ColorConstant = {
  // Blue scale
  Blue100: 'blue-100',
  Blue200: 'blue-200',
  Blue300: 'blue-300',
  Blue400: 'blue-400',
  // Green scale
  Green100: 'green-100',
  Green200: 'green-200',
  Green300: 'green-300',
  Green400: 'green-400',
  Green500: 'green-500',
  Green600: 'green-600',

  // Neutral / Gray scale
  Neutral100: 'neutral-100',
  Neutral1000: 'neutral-1000',
  Neutral1100: 'neutral-1100',
  Neutral200: 'neutral-200',
  Neutral250: 'neutral-250',
  Neutral300: 'neutral-300',
  Neutral400: 'neutral-400',
  Neutral500: 'neutral-500',
  Neutral550: 'neutral-500',
  Neutral600: 'neutral-600',
  Neutral700: 'neutral-700',
  Neutral800: 'neutral-800',
  Neutral900: 'neutral-900',

  // Orange / Yellow scale
  Orange100: 'orange-100',
  Orange200: 'orange-200',
  Orange300: 'orange-300',

  Orange400: 'orange-400',
  // Purple / Magenta scale
  Purple100: 'purple-100',
  Purple200: 'purple-200',
  Purple300: 'purple-300',

  // Other
  Warn: 'warn',
  White: 'white',
} as const;

export type ColorConstantValuesType = ObjectValues<typeof ColorConstant>;
