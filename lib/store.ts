import { configureStore } from "@reduxjs/toolkit";
import screeningReducer from "./features/screening/screening-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      screening: screeningReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
