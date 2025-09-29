// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type {
  Decorator,
  Preview,
  ReactRenderer,
  StoryContext,
  StoryFn,
} from '@storybook/react-vite';

import {
  createMemoryHistory,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/react-router';

const rootRoute = new RootRoute();
const indexRoute = new Route({ getParentRoute: () => rootRoute, path: '/' });
const memoryHistory = createMemoryHistory({ initialEntries: ['/'] });
const routeTree = rootRoute.addChildren([indexRoute]);
export const storybookRouter = new Router({
  history: memoryHistory,
  routeTree,
});

export const withSbTanstackRouter: Preview['decorators'][0] = (
  Story: StoryFn,
  context: StoryContext<ReactRenderer>,
) => {
  return (
    <RouterProvider
      defaultComponent={() => <Story {...context} />}
      router={storybookRouter}
    />
  );
};

export const RouterDecorator: Decorator = (Story, args) => (
  <>{withSbTanstackRouter(Story, args)}</>
);
