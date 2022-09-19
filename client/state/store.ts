import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "../features/UI_apps/notifications/slice";

const store = configureStore({
  reducer: {
    notifications: notificationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
