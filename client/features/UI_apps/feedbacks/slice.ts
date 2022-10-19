import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { feedback } from "./interfaces/slice.types";

const pushFeedbackAction: CaseReducer<feedback, PayloadAction<feedback>> = (
  state,
  action
) => action.payload;

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {} as feedback,
  reducers: {
    pushFeedback: pushFeedbackAction,
  },
});

export const { pushFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
