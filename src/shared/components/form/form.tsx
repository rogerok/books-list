import type { MobxForm } from '@shared/lib/mobx/mobx-form/mobx-form';
import type { FormEvent, ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';

import { FormProvider } from '@shared/lib/mobx/mobx-form/form-context-provider';
import { observer } from 'mobx-react-lite';

interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> {
  children: ReactNode;
  methods: MobxForm<TFieldValues, TContext, TTransformedValues>;
  className?: string;
}

export const Form = observer(
  <
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
  >(
    props: FormProps<TFieldValues, TContext, TTransformedValues>,
  ) => {
    const { children, className, methods } = props;

    const handleSubmit = async (
      event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
      event.preventDefault();

      await methods.submit();
    };

    return (
      <FormProvider methods={methods}>
        <form className={className} noValidate onSubmit={handleSubmit}>
          {children}
        </form>
      </FormProvider>
    );
  },
);
