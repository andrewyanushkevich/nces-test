import { baseApi } from "@/shared/api/base.api";
import type { Tag } from "./tag.type";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => "tags",
    }),
  }),
});

export const { useGetTagsQuery } = tagApi;
