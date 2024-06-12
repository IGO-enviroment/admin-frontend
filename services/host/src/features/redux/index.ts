import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { eventsApi } from "@/features/redux/event-service";
import { eventsTypeApi } from "@/features/redux/event-type-service";
import { areaApi } from "@/features/redux/area-service";
import { tagApi } from "@/features/redux/tag-service";

const rootReducer = combineReducers({
   [eventsApi.reducerPath]: eventsApi.reducer,
   [eventsTypeApi.reducerPath]: eventsTypeApi.reducer,
   [areaApi.reducerPath]: areaApi.reducer,
   [tagApi.reducerPath]: tagApi.reducer,
});

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(eventsApi.middleware, eventsTypeApi.middleware, areaApi.middleware, tagApi.middleware),
   devTools: true,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TRootDispatch = typeof store.dispatch;
