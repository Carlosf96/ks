import { RootState } from '@/store';

export const selectorFeedbacksData = (state: RootState) =>
  state.feedbacks.data;
export const selectorFeedbacksLoading = (state: RootState) =>
  state.feedbacks.loading;
export const selectorFeedbacksFail = (state: RootState) =>
  state.feedbacks.fail;
export const selectorFeedbacksShowSnack = (state: RootState) =>
  state.feedbacks.showSnack;
