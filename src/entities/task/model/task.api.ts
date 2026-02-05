import { baseApi } from "@/shared/api/base.api";
import type { Task, TaskFilters } from "./task.type";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], TaskFilters>({
      query: (filters) => {
        const params: Record<string, string | string[]> = {};

        if (filters.priority && filters.priority !== "all") {
          params.priority = filters.priority;
        }
        if (filters.status && filters.status !== "all") {
          params.status = filters.status;
        }
        if (filters.tags && filters.tags.length > 0) {
          params.tags = filters.tags;
        }

        const search = new URLSearchParams(
          Object.entries(params).flatMap(([key, value]) =>
            Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
          )
        ).toString();

        return search ? `tasks?${search}` : "tasks";
      },
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `tasks/${id}`,
    }),
    createTask: builder.mutation<
      Task,
      Omit<Task, "id" | "createdAt" | "updatedAt">
    >({
      query: (payload) => ({
        url: "tasks",
        method: "POST",
        body: payload,
      }),
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetTasksQuery, useGetTaskByIdQuery, useDeleteTaskMutation } =
  taskApi;
