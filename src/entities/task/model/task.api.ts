import { baseApi } from "@/shared/api/base.api";
import type {
  Task,
  TaskFilters,
  TaskFormValues,
  TaskStatus,
} from "./task.type";

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
        if (filters.search) {
          params.q = filters.search;
        }

        if (filters.sortByDate) {
          params["_sort"] = "deadline";
          params["_order"] = filters.sortByDate;
        }

        const search = new URLSearchParams(
          Object.entries(params).flatMap(([key, value]) =>
            Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
          )
        ).toString();

        return search ? `tasks?${search}` : "tasks";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tasks", id } as const)),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    getTaskById: builder.query<Task, string>({
      query: (id) => `tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Tasks", id }],
    }),
    createTask: builder.mutation<Task, TaskFormValues>({
      query: (payload) => ({
        url: "tasks",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [
        { type: "Tasks", id: "LIST" },
        { type: "Tags", id: "LIST" },
      ],
    }),
    editTask: builder.mutation<
      Task,
      { id: string; payload: Partial<TaskFormValues> }
    >({
      query: ({ id, payload }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Tasks", id }],
    }),
    updateStatus: builder.mutation<Task, { id: string; status: TaskStatus }>({
      query: ({ id, status }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Tasks", id }],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Tasks", id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useUpdateStatusMutation,
  useDeleteTaskMutation,
} = taskApi;
