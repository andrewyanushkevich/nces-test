import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../shared/api/base.api";
import type { Task } from "./task.type";

export const taskApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task, void>({
      query: () => "tasks",
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
