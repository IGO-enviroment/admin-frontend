import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseURL } from "@/shared/constants";
import { getCookie } from "@/shared/cookies/get";

export const tags = "/v1/admin/tags";

export const tagApi = createApi({
   reducerPath: "tags",
   baseQuery: fetchBaseQuery({
      baseUrl: baseURL,
   }),
   tagTypes: ["Tags"],
   endpoints: (build) => ({
      getAllTags: build.query<any, string>({
         query: () => ({
            url: tags,
            headers: {
               Authorization: getCookie("museum_client_auth"),
            },
         }),
         providesTags: ["Tags"],
      }),
      createTag: build.mutation({
         query: (data) => {
            return {
               url: `${tags}/create`,
               method: "POST",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
               },
               body: data,
            };
         },
         invalidatesTags: ["Tags"],
      }),
      deleteTag: build.mutation({
         query: (id) => {
            return {
               url: `${tags}/${id}`,
               method: "DELETE",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
                  "ngrok-skip-browser-warning": "true",
               },
            };
         },

         invalidatesTags: ["Tags"],
      }),
      updateTag: build.mutation({
         query: ({ data, id }) => {
            return {
               url: `${tags}/${id}`,
               method: "PUT",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
                  "ngrok-skip-browser-warning": "true",
               },
               body: data,
            };
         },
         invalidatesTags: ["Tags"],
      }),
   }),
});
