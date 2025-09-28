import type {
  DeepPartial,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
} from 'react-hook-form';

import type { MobxForm } from './mobx-form';

export type AnyForm = MobxForm<any, any, any>;

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
