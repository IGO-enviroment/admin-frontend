import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseURL } from "@/shared/constants";
import { TokenService } from "@/shared/services/token-service";

export const allEvents = "/v1/admin/events";

export const eventsApi = createApi({
   reducerPath: "allEvents",
   baseQuery: fetchBaseQuery({
      baseUrl: baseURL,
   }),
   tagTypes: ["Events"],
   endpoints: (build) => ({
      getAllEvents: build.query<any, string>({
         query: () => ({ url: allEvents }),
         providesTags: ["Events"],
      }),
      createEvent: build.mutation({
         query: (data) => {
            return {
               url: allEvents,
               method: "POST",
               body: data,
            };
         },
         invalidatesTags: ["Events"],
      }),
   }),
});
