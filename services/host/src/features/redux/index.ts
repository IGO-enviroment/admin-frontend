import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { eventsApi } from "@/features/redux/event-service";
import { eventsTypeApi } from "@/features/redux/event-type-service";

const rootReducer = combineReducers({
   [eventsApi.reducerPath]: eventsApi.reducer,
   [eventsTypeApi.reducerPath]: eventsTypeApi.reducer,
});

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventsApi.middleware, eventsTypeApi.middleware),
   devTools: true,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TRootDispatch = typeof store.dispatch;
