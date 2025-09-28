import type {
  DeepPartial,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
} from 'react-hook-form';

import type { Form } from './mobx-form.ts';

export type AnyForm = Form<any, any, any>;

export interface FormParams<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> extends Omit<
    UseFormProps<TFieldValues, TContext, TTransformedValues>,
    'defaultValues'
  > {
  abortSignal?: AbortSignal;

  defaultValues?: DeepPartial<TFieldValues>;

  lazyUpdates?: boolean;

  lazyUpdatesTimer?: number;

  onSubmit?: SubmitHandler<TTransformedValues>;

  onSubmitFailed?: SubmitErrorHandler<TFieldValues>;

  onReset?: (event: any) => void;
}

export type ExtractFormFieldValues<T extends AnyForm> = Exclude<
  T['values'],
  null | undefined
>;

export type ExtractFormFieldOutputValues<T extends AnyForm> =
  T extends Form<any, any, infer TFieldOutputValues>
    ? TFieldOutputValues
    : never;
