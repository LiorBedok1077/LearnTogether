import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Istate {
  title: string | undefined;
  content: string | undefined;
  color: string | undefined;
}

const pushFeedbackAction: CaseReducer<Istate, PayloadAction<Istate>> = (
  state,
  action
) => {
  console.log(action);
  return {
    title: action.payload?.title,
    content: action.payload?.content,
    color: action.payload?.color,
  };
};
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    title: undefined,
    content: undefined,
    color: undefined,
  } as Istate,
  reducers: {
    pushFeedback: pushFeedbackAction,
  },
});

export const { pushFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
