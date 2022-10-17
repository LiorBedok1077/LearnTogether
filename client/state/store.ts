import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "../features/UI_apps/notifications/slice";
import feedbackSlice from "../features/UI_apps/feedbacks/slice";

const store = configureStore({
  reducer: {
    notifications: notificationsSlice,
    feedback: feedbackSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
