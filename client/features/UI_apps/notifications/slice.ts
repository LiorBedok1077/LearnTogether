import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationStruct } from "./types";

interface Istate {
  notifications: NotificationStruct[];
}
//getNotifications

//getNotification(id)

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  } as Istate,
  reducers: {},
});

export default notificationsSlice.reducer;
