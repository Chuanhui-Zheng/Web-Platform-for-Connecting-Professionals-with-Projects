'use client';

import * as React from 'react';
import { NavigationContext, RouterContext } from "../shared/context.js";
import { getItemPath, getItemTitle, matchPath } from "../shared/navigation.js";
export function useActivePage() {
  const navigationContext = React.useContext(NavigationContext);
  const routerContext = React.useContext(RouterContext);
  const pathname = routerContext?.pathname ?? '/';
  const activeItem = matchPath(navigationContext, pathname);
  const rootItem = matchPath(navigationContext, '/');
  return React.useMemo(() => {
    if (!activeItem) {
      return null;
    }
    const breadCrumbs = [];
    if (rootItem) {
      breadCrumbs.push({
        title: getItemTitle(rootItem),
        path: '/'
      });
    }
    const segments = pathname.split('/').filter(Boolean);
    let prefix = '';
    for (const segment of segments) {
      const path = `${prefix}/${segment}`;
      prefix = path;
      const item = matchPath(navigationContext, path);
      if (!item) {
        continue;
      }
      const itemPath = getItemPath(navigationContext, item);
      const lastCrumb = breadCrumbs[breadCrumbs.length - 1];
      if (lastCrumb?.path !== itemPath) {
        breadCrumbs.push({
          title: getItemTitle(item),
          path: itemPath
        });
      }
    }
    return {
      title: getItemTitle(activeItem),
      path: getItemPath(navigationContext, activeItem),
      breadCrumbs
    };
  }, [activeItem, rootItem, pathname, navigationContext]);
}