import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseURL } from "@/shared/constants";
import { getCookie } from "@/shared/cookies/get";

export const allEvents = "/v1/admin/event-types/create";

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
               url: allEvents,
               method: "POST",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
               },
               body: data,
            };
         },
         invalidatesTags: ["EventTypes"],
      }),
   }),
});
