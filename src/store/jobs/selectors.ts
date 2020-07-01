import { RootState } from '@/store';

export const sel_jobsData = (state: RootState) => state.jobs.all;
export const sel_jobData = (state: RootState) => state.jobs.one;
export const sel_jobsLoading = (state: RootState) =>
  state.jobs.loading;
export const selectorJobsFail = (state: RootState) => state.jobs.fail;
export const sel_edit_success = (state: RootState) =>
  state.jobs.successfulEdit;
