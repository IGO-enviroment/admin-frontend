import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseURL } from "@/shared/constants";
import { serialize } from "object-to-formdata";
import { getCookie } from "@/shared/cookies/get";

export const allEvents = "/v1/admin/events";

export const eventsApi = createApi({
   reducerPath: "allEvents",
   baseQuery: fetchBaseQuery({
      baseUrl: baseURL,
   }),
   tagTypes: ["Events"],
   endpoints: (build) => ({
      getAllEvents: build.query<any, string>({
         query: () => ({
            url: allEvents,
            headers: {
               Authorization: getCookie("museum_client_auth"),
            },
         }),
         providesTags: ["Events"],
      }),
      createEvent: build.mutation({
         query: (data) => {
            const formData = serialize(data, { nullsAsUndefineds: true });
            return {
               url: allEvents,
               method: "POST",
               headers: {
                  Authorization: getCookie("museum_client_auth"),
               },
               body: formData,
            };
         },
         invalidatesTags: ["Events"],
      }),
   }),
});
