import { PayloadAction } from '@reduxjs/toolkit';
import { IJob } from '@/modules/Jobs/typings';
import { IFetchError } from '@/store/typings';

type SuccessfulEdit = {
  message: string;
  success: boolean;
};

type State = {
  all: IJob[];
  one: IJob;
  loading: boolean;
  fail: IFetchError;
  successfulEdit: SuccessfulEdit;
};

export const addJob = (state: State, action: PayloadAction<IJob>) => {
  const newJob: IJob = action.payload;
  state.all.push(newJob);
};
export const getAllJobs = (
  state: State,
  action: PayloadAction<IJob[]>,
) => {
  state.all = action.payload;
};

export const getOneJob = (
  state: State,
  action: PayloadAction<IJob>,
) => {
  state.one = action.payload;
};
export const failFetchJobs = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.loading = false;
  state.fail = action.payload;
};
export const removeJob = (
  state: State,
  action: PayloadAction<number>,
) => {
  state.all = state.all.filter(job => job.id !== action.payload);
};

export const requestFetchJobs = (state: State) => {
  state.loading = true;
};

export const responseFetchJobs = (state: State) => {
  state.loading = false;
};

export const beginEdit = (state: State) => {
  state.successfulEdit.success = false;
  state.successfulEdit.message = '';
};
export const endEdit = (state: State) => {
  state.successfulEdit.success = false;
  state.successfulEdit.message = '';
};
export const errorEdit = (
  state: State,
  action: PayloadAction<SuccessfulEdit>,
) => {
  state.successfulEdit = action.payload;
};
export const successfulEdit = (
  state: State,
  action: PayloadAction<SuccessfulEdit>,
) => {
  state.successfulEdit = action.payload;
};

export default {
  getOneJob,
  addJob,
  failFetchJobs,
  getAllJobs,
  removeJob,
  requestFetchJobs,
  responseFetchJobs,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
};
