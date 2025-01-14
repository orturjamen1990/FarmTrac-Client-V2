import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authSlice from "./common-slices/authSlice";
import darkModeReducer from "./common-slices/darkModeSlice";
import compactMenuReducer from "./common-slices/compactMenuSlice";
import sideMenuReducer from "./common-slices/sideMenuSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    darkMode: darkModeReducer,
    compactMenu: compactMenuReducer,
    sideMenu: sideMenuReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
