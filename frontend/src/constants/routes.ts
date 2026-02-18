/* =====================
   ROUTES (GROUPÉES)
   ===================== */

export const ROUTES = {
  HOME: "/",

  DASHBOARD: "/dashboard",

  ARTICLES: {
    ROOT: "/articles",
    ADD: "/articles/add",
    DETAIL: "/articles/:id",
  },

  CATEGORIES: {
    ROOT: "/categories",
  },

  NOTIFICATIONS: {
    ROOT: "/notifications",
  },

  IMPORT: "/import",
} as const;

/* =========
   TYPES
   ========= */

export interface RouteParams {
  [key: string]: string | number;
}

/* =========
   HELPERS
   ========= */

export function routeWithParams(
  pathname: string,
  params: RouteParams
): string {
  let route = pathname;

  Object.entries(params).forEach(([key, value]) => {
    route = route.replace(`:${key}`, value.toString());
  });

  return route;
}
