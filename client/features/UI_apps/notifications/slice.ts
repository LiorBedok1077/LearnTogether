import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Istate {
  notifications: string[];
}

const pushNotificationAction: CaseReducer<Istate, PayloadAction<string>> = (
  state,
  action
) => {
  return void state.notifications.push(action.payload);
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: ["yo"],
  } as Istate,
  reducers: {
    pushNotification: pushNotificationAction,
  },
});

export const { pushNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
