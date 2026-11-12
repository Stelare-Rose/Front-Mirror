import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [];

export function registerRoute(route: RouteObject) {
  routes.push(route);
}

export function getRoutes() {
  return routes;
}
