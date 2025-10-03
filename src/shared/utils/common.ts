import type { MaybeFn } from '@shared/utils/ts-utils/ts-utils';

export const callFunction = <TValue, TArgs extends any[] = []>(
  fn: MaybeFn<TValue, TArgs>,
  ...args: TArgs
) => {
  if (typeof fn === 'function') {
    return (fn as any)(...args) as TValue;
  }

  return fn;
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : '';
};
