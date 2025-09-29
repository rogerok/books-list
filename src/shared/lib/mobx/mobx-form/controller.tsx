import type { ReactNode } from 'react';

import { Observer } from 'mobx-react-lite';
import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  Controller as RHFController,
} from 'react-hook-form';

export const Controller = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: ControllerProps<TFieldValues, TName, TTransformedValues>,
): ReactNode => {
  const { render, ...rest } = props;

  return (
    <RHFController
      {...rest}
      render={(renderProps) => <Observer>{() => render(renderProps)}</Observer>}
    />
  );
};
