export class LinkedAbortController extends AbortController {
  constructor(...abortSignals: (AbortSignal | undefined)[]) {
    super();
    this.link(...abortSignals);
  }

  link(...abortSignals: (AbortSignal | undefined)[]): void {
    abortSignals.forEach((abortSignal) => {
      abortSignal?.addEventListener('abort', () => {
        this.abort(abortSignal.reason);
      });
    });
  }
}
