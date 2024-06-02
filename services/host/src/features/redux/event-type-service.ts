import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseURL } from "@/shared/constants";
import { TokenService } from "@/shared/services/token-service";
import { serialize } from "object-to-formdata";

export const allEvents = "/v1/admin/event-types/create";

export const eventsTypeApi = createApi({
   reducerPath: "allEventsTypes",
   baseQuery: fetchBaseQuery({
      baseUrl: baseURL,
   }),
   tagTypes: ["EventTypes"],
   endpoints: (build) => ({
      getAllEventTypes: build.query<any, string>({
         query: () => ({ url: allEvents }),
         providesTags: ["EventTypes"],
      }),
      createEventType: build.mutation({
         query: (data) => {
            return {
               url: allEvents,
               method: "POST",
               body: data,
            };
         },
         invalidatesTags: ["EventTypes"],
      }),
   }),
});
