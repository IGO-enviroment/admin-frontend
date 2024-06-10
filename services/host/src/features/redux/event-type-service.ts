import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseURL } from "@/shared/constants";
import { getCookie } from "@/shared/cookies/get";

export const allEvents = "/v1/admin/event-types";

export const eventsTypeApi = createApi({
   reducerPath: "allEventsTypes",
   baseQuery: fetchBaseQuery({
      baseUrl: baseURL,
   }),
   tagTypes: ["EventTypes"],
   endpoints: (build) => ({
      getAllEventTypes: build.query<any, string>({
         query: () => ({
            url: allEvents,
            headers: {
               Authorization: getCookie("museum_client_auth"),
            },
         }),
         providesTags: ["EventTypes"],
      }),
      createEventType: build.mutation({
         query: (data) => {
            return {
               url: `${allEvents}/create`,
               method: "POST",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
               },
               body: data,
            };
         },
         invalidatesTags: ["EventTypes"],
      }),
      deleteArea: build.mutation({
         query: (id) => {
            return {
               url: `${allEvents}/${id}`,
               method: "DELETE",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
                  "ngrok-skip-browser-warning": "true",
               },
            };
         },

         invalidatesTags: ["EventTypes"],
      }),
      updateArea: build.mutation({
         query: ({ data, id }) => {
            return {
               url: `${allEvents}/${id}`,
               method: "PUT",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
                  "ngrok-skip-browser-warning": "true",
               },
               body: data,
            };
         },
         invalidatesTags: ["EventTypes"],
      }),
   }),
});
