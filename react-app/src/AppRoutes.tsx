import { useRoutes } from "react-router-dom";
import Layout from "./Layout";
import { getRoutes } from "./routeRegistry";

export default function AppRoutes() {
  return useRoutes([{ element: <Layout />, children: getRoutes() }]);
}
