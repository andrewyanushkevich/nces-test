import { createBrowserRouter, type RouteObject } from "react-router-dom";
import TaskList from "../pages/task-list";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: TaskList,
  },
];

export const router = createBrowserRouter(routes);
