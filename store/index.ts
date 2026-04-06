import { configureStore } from "@reduxjs/toolkit";
import { offerSlice } from "./offerSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      offer: offerSlice.reducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
