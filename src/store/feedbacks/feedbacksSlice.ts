import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState: {
    loading: false,
    data: [],
    fail: {
      message: ' ',
      status: 200,
      error: false,
    },
    showSnack: false,
  },
  reducers,
});

export const {
  addFeedback,
  removeFeedback,
  failFetchFeedbacks,
  getAllFeedbacks,
  requestFetchFeedbacks,
  responseFetchFeedbacks,
  setShowSnack,
} = feedbacksSlice.actions;

export default feedbacksSlice.reducer;
