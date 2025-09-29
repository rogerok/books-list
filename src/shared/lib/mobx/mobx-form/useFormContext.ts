import type { FieldValues } from 'react-hook-form';

import { FormContext } from '@shared/lib/mobx/mobx-form/form-context';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form';
import { useContext } from 'react';

export const useFormContext = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(): MobxForm<TFieldValues, TContext, TTransformedValues> => {
  const ctx = useContext(FormContext);

  if (!ctx) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return ctx as MobxForm<TFieldValues, TContext, TTransformedValues>;
};
