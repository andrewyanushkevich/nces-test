import { createBrowserRouter, type RouteObject } from "react-router-dom";
import TaskListPage from "@/pages/task-list";
import TaskDetailsPage from "@/pages/task-details";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: TaskListPage,
  },
  {
    path: "/task/:id",
    Component: TaskDetailsPage,
  },
];

export const router = createBrowserRouter(routes);
