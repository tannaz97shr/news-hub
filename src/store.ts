import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./features/loading/loadingSlice";
import newsReducer from "./features/news/newsSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
