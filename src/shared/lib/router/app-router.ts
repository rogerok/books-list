import type { RouterType } from '@shared/types/router.ts';
import type { NavigateOptions } from '@tanstack/react-router';

import { routes } from '@shared/config/router/routes.ts';

export class RouterController {
  private _router!: RouterType;

  navigate(options: NavigateOptions) {
    void this.router.navigate(options);
  }

  toSignIn() {
    this.navigate({
      to: routes.signIn(),
    });
  }

  get router(): RouterType {
    return this._router;
  }

  init = (router: RouterType): void => {
    this._router = router;
  };
}

export const AppRouter = new RouterController();
