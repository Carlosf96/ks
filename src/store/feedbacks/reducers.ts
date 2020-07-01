import { PayloadAction } from '@reduxjs/toolkit';
import { IFeedback } from '@/modules/Candidates/typings';
import { IFetchError } from '@/store/typings';

type State = {
  data: IFeedback[];
  loading: boolean;
  fail: IFetchError;
  showSnack: boolean;
};

export const addFeedback = (
  state: State,
  action: PayloadAction<IFeedback>,
) => {
  const newFeedback: IFeedback = action.payload;
  state.data.push(newFeedback);
};

export const getAllFeedbacks = (
  state: State,
  action: PayloadAction<IFeedback[]>,
) => {
  state.data = action.payload;
};

export const removeFeedback = (
  state: State,
  action: PayloadAction<number>,
) => {
  state.data = state.data.filter(
    feedback => feedback.userId !== action.payload,
  );
};

export const requestFetchFeedbacks = (state: State) => {
  state.loading = true;
};

export const responseFetchFeedbacks = (state: State) => {
  state.loading = false;
};

export const failFetchFeedbacks = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.loading = false;
  state.fail = action.payload;
};

export const setShowSnack = (
  state: State,
  action: PayloadAction<boolean>,
) => {
  state.showSnack = action.payload;
};

export default {
  addFeedback,
  removeFeedback,
  failFetchFeedbacks,
  getAllFeedbacks,
  requestFetchFeedbacks,
  responseFetchFeedbacks,
  setShowSnack,
};
