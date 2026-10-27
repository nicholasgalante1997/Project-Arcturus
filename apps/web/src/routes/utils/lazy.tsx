import type { RouteObject } from 'react-router';

type LazyRouteObject = Exclude<RouteObject['lazy'], undefined>;

/**
 * createLazyRouteConfiguration
 *
 * @see https://vite.dev/guide/features#dynamic-import
 * @see https://reactrouter.com/start/data/custom#3-lazy-loading
 *
 * Similar to how we can lazy load a Component using React.lazy,
 * we can also lazy load a route using the lazy property on a RouteObject.
 * It accepts a subset of the fields that the base RouteObject accepts,
 * but for our purposes, we'll primarily be concerned with
 * - Component
 * - loader
 *
 * So that we can lazy load a React Page for a given route,
 * and so that we can lazy load/provision any data loaders that route depends on.
 *
 * Vite statically analyzes this template-literal import (it must stay relative
 * and include the file extension) and emits one chunk per file in `src/pages`.
 * Bun resolves the same expression at runtime during prerender.
 */

export function createLazyRouteConfiguration(page: string): LazyRouteObject {
  return {
    Component: async () => (await import(`../../pages/${page}.tsx`)).default
  };
}
