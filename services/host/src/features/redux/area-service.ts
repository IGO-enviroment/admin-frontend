import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/shared/constants";
import { getCookie } from "@/shared/cookies/get";

export const AREAS = "/v1/admin/areas";

export const areaApi = createApi({
   reducerPath: "areas",
   baseQuery: fetchBaseQuery({
      baseUrl: baseURL,
   }),
   tagTypes: ["areas"],
   endpoints: (build) => ({
      getAllAreas: build.query<any, string>({
         query: () => ({
            url: AREAS,
            headers: {
               Authorization: getCookie("museum_client_auth"),
               "ngrok-skip-browser-warning": "true",
            },
         }),
         providesTags: ["areas"],
      }),
      createArea: build.mutation({
         query: (data) => {
            return {
               url: `${AREAS}/create`,
               method: "POST",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
                  "ngrok-skip-browser-warning": "true",
               },
               body: data,
            };
         },
         invalidatesTags: ["areas"],
      }),
      deleteArea: build.mutation({
         query: (id) => {
            return {
               url: `${AREAS}/${id}`,
               method: "DELETE",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
                  "ngrok-skip-browser-warning": "true",
               },
            };
         },
         invalidatesTags: ["areas"],
      }),
      updateArea: build.mutation({
         query: ({ data, id }) => {
            return {
               url: `${AREAS}/${id}`,
               method: "PUT",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
                  "ngrok-skip-browser-warning": "true",
               },
               body: data,
            };
         },
         invalidatesTags: ["areas"],
      }),
   }),
});
