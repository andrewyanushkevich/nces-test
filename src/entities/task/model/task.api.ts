import { baseApi } from "@/shared/api/base.api";
import type { Task } from "./task.type";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "tasks",
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
