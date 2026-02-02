import { createBrowserRouter, type RouteObject } from "react-router-dom";
import TaskListPage from "@/pages/task-list";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: TaskListPage,
  },
];

export const router = createBrowserRouter(routes);
