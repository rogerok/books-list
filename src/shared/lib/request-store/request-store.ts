import { getErrorMessage } from '@shared/utils/getErrorMessage.ts';
import { makeAutoObservable, runInAction } from 'mobx';

type SuccessResult<T> = { response: T; status: 'success' };
type ErrorResult = { error: any; response: null; status: 'error' };
type LoadingResult = { response: null; status: 'loading' };
type IdleResult = { response: null; status: 'idle' };

type Result<T> = ErrorResult | IdleResult | LoadingResult | SuccessResult<T>;
type ExecuteResult<T> = ErrorResult | SuccessResult<T>;

interface ExecuteOptions {
  onError?: (errorMessage: string | undefined) => void;
  onSuccess?: () => void;
}

export class RequestStore<T, Args extends any[] = []> {
  executeOptions: ExecuteOptions | undefined;

  result: Result<T> = { response: null, status: 'idle' };

  constructor(
    private fetchFn: (...args: Args) => Promise<T>,
    executeOptions?: ExecuteOptions,
  ) {
    this.executeOptions = executeOptions;

    makeAutoObservable<this, 'executeOptions' | 'fetchFn'>(
      this,
      { executeOptions: false, fetchFn: false },
      { autoBind: true },
    );
  }

  get isLoading(): boolean {
    return this.result.status === 'loading';
  }

  get isSuccess(): boolean {
    return this.result.status === 'success';
  }

  execute = async (...args: Args): Promise<ExecuteResult<T>> => {
    this.result = { response: null, status: 'loading' };
    try {
      const resp = await this.fetchFn(...args);

      runInAction(() => {
        this.result = { response: resp, status: 'success' };
        this.executeOptions?.onSuccess?.();
      });
    } catch (error) {
      runInAction(() => {
        this.result = { error, response: null, status: 'error' };
      });

      this.executeOptions?.onError?.(getErrorMessage(error));
    }

    return this.result as unknown as ExecuteResult<T>;
  };
}
