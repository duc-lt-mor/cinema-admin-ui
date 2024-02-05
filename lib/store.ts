import { configureStore } from "@reduxjs/toolkit";
import screeningReducer from "./features/screening/screening-slice";
import userReducer from "./features/user/user-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      screening: screeningReducer,
      user: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
