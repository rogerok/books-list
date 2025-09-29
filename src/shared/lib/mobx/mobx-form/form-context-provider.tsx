import type { ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';

import { FormContext } from '@shared/lib/mobx/mobx-form/form-context.tsx';
import { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form.ts';

interface FormProviderProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> {
  children: ReactNode;
  methods: MobxForm<TFieldValues, TContext, TTransformedValues>;
}

export const FormProvider = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(
  props: FormProviderProps<TFieldValues, TContext, TTransformedValues>,
): ReactNode => {
  return <FormContext value={props.methods}>{props.children}</FormContext>;
};
