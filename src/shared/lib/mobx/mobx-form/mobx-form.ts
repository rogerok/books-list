import type { FormParams } from '@shared/lib/mobx/mobx-form/types';
import type { BaseSyntheticEvent } from 'react';

import { LinkedAbortController } from '@shared/lib/linked-abort-controller/linked-abort-controller';
import { DeepObservableStruct } from '@shared/lib/mobx/deep-observable-struct';
import {
  action,
  isObservableObject,
  makeObservable,
  observable,
  toJS,
} from 'mobx';
import {
  type Control,
  createFormControl,
  type DeepMap,
  type DeepPartial,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  type FormState,
  get,
  set,
  type UseFormClearErrors,
  type UseFormRegister,
  type UseFormReset,
  type UseFormResetField,
  type UseFormSetError,
  type UseFormSetFocus,
  type UseFormSetValue,
  type UseFormTrigger,
  type UseFormUnregister,
} from 'react-hook-form';

type FormFullState<TFieldValues extends FieldValues> = {
  values: TFieldValues;
} & FormState<TFieldValues>;

export class MobxForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> implements FormFullState<TFieldValues>
{
  private _observableStruct: DeepObservableStruct<
    Pick<
      FormFullState<TFieldValues>,
      'dirtyFields' | 'errors' | 'touchedFields' | 'validatingFields' | 'values'
    >
  >;
  protected abortController: AbortController;

  clearErrors: UseFormClearErrors<TFieldValues>;

  control: Control<TFieldValues, TContext, TTransformedValues>;

  defaultValues!: Readonly<DefaultValues<TFieldValues>>;
  dirtyFields: Partial<Readonly<DeepMap<DeepPartial<TFieldValues>, boolean>>>;
  disabled: boolean = false;
  errors: FieldErrors<TFieldValues>;
  isDirty: boolean = false;
  isLoading: boolean = false;
  isReady: boolean = false;
  isSubmitSuccessful: boolean = false;
  isSubmitted: boolean = false;
  isSubmitting: boolean = false;
  isValid: boolean = false;
  isValidating: boolean = false;

  originalForm: ReturnType<
    typeof createFormControl<TFieldValues, TContext, TTransformedValues>
  >;

  register: UseFormRegister<TFieldValues>;

  resetField: UseFormResetField<TFieldValues>;

  resetForm: UseFormReset<TFieldValues>;

  setError: UseFormSetError<TFieldValues>;

  setFocus: UseFormSetFocus<TFieldValues>;

  setValue: UseFormSetValue<TFieldValues>;

  submitCount: number = 0;

  touchedFields: Partial<Readonly<DeepMap<DeepPartial<TFieldValues>, boolean>>>;

  trigger: UseFormTrigger<TFieldValues>;

  unregister: UseFormUnregister<TFieldValues>;

  validatingFields: Partial<
    Readonly<DeepMap<DeepPartial<TFieldValues>, boolean>>
  >;

  values: TFieldValues;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    private config: FormParams<TFieldValues, TContext, TTransformedValues>,
  ) {
    this.abortController = new LinkedAbortController(config.abortSignal);

    this.originalForm = createFormControl<
      TFieldValues,
      TContext,
      TTransformedValues
    >({
      ...config,
      defaultValues: {
        ...config.defaultValues,
      } as DefaultValues<TFieldValues>,
    });

    const defaultValues = config.defaultValues
      ? { ...config.defaultValues }
      : ({} as any);

    this.setError = this.originalForm.setError;
    this.clearErrors = this.originalForm.clearErrors;
    this.trigger = this.originalForm.trigger;
    this.resetField = action((...args) => {
      set(this.values, args[0], get(this.defaultValues, args[0]));
      return this.originalForm.resetField(...args);
    });
    this.unregister = this.originalForm.unregister;
    this.control = this.originalForm.control;
    this.register = this.originalForm.register;
    this.setFocus = this.originalForm.setFocus;
    this.setValue = action((...args) => {
      set(this.values, args[0], args[1]);
      return this.originalForm.setValue(...args);
    });
    this.resetForm = action((...args) => {
      let defaultValues = args[0] ?? this.defaultValues;

      if (isObservableObject(defaultValues)) {
        defaultValues = toJS(defaultValues);
      } else {
        defaultValues = structuredClone(defaultValues);
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.values = defaultValues;
      return this.originalForm.reset(...args);
    });

    this._observableStruct = new DeepObservableStruct({
      dirtyFields: {},
      errors: {},
      touchedFields: {},
      validatingFields: {},
      values: this.originalForm.getValues(),
    });

    this.values = this._observableStruct.data.values;
    this.errors = this._observableStruct.data.errors;
    this.validatingFields = this._observableStruct.data.validatingFields;
    this.dirtyFields = this._observableStruct.data.dirtyFields;
    this.touchedFields = this._observableStruct.data.touchedFields;

    Object.assign(this, {
      defaultValues,
    });

    const subscription = this.originalForm.subscribe({
      callback: (rawFormState) => {
        this.updateFormState(rawFormState);
      },
      formState: {
        dirtyFields: true,
        errors: true,
        isDirty: true,
        isValid: true,
        isValidating: true,
        touchedFields: true,
        validatingFields: true,
        values: true,
      },
    });

    observable.ref(this, 'isDirty');
    observable.ref(this, 'isLoading');
    observable.ref(this, 'isSubmitted');
    observable.ref(this, 'isSubmitSuccessful');
    observable.ref(this, 'isSubmitting');
    observable.ref(this, 'isValidating');
    observable.ref(this, 'isValid');
    observable.ref(this, 'disabled');
    observable.ref(this, 'submitCount');
    observable.ref(this, 'isReady');
    observable.deep(this, 'defaultValues');
    action(this, 'updateFormState');

    observable.ref(this, 'originalForm');
    action.bound(this, 'submit');
    action.bound(this, 'reset');

    makeObservable(this);

    this.abortController.signal.addEventListener('abort', () => {
      subscription();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.originalForm = null;
    });
  }

  destroy(): void {
    this.abortController.abort();
  }

  reset(e?: BaseSyntheticEvent): void {
    this.resetForm();
    this.config.onReset?.(e);
  }

  submit(e?: BaseSyntheticEvent): Promise<TTransformedValues> {
    return new Promise<TTransformedValues>((resolve, reject) => {
      if (this.originalForm) {
        this.originalForm.handleSubmit(
          async (data, event) => {
            await this.config.onSubmit?.(data, event);
            resolve(data);
          },
          async (errors, event) => {
            await this.config.onSubmitFailed?.(errors, event);
            reject(errors);
          },
        )(e);
      } else {
        const emptyData = (this.values ?? {}) as unknown as TTransformedValues;
        const result = this.config.onSubmit?.(emptyData);
        if (result instanceof Promise) {
          return result.then(() => resolve(emptyData));
        } else {
          return Promise.resolve(emptyData);
        }
      }
    });
  }

  private updateFormState({
    dirtyFields,
    errors,
    touchedFields,
    validatingFields,
    values,
    ...simpleProperties
  }: Partial<FormFullState<TFieldValues>>): void {
    Object.entries(simpleProperties).forEach(([key, value]) => {
      if (value != null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this[key] = value;
      }
    });

    this._observableStruct.set({
      dirtyFields,
      errors,
      touchedFields,
      validatingFields,
      values,
    });
  }
}
