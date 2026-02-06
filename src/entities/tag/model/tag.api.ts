import { baseApi } from "@/shared/api/base.api";
import type { Tag } from "./tag.type";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => "tags",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tags", id } as const)),
              { type: "Tags", id: "LIST" },
            ]
          : [{ type: "Tags", id: "LIST" }],
    }),
  }),
});

export const { useGetTagsQuery } = tagApi;
