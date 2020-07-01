import { PayloadAction } from '@reduxjs/toolkit';
import { ICandidateNew } from '@/modules/Candidates/typings';
import { IFetchError } from '@/store/typings';

type SuccessfulEdit = {
  message: string;
  success: boolean;
};

type State = {
  data: ICandidateNew[];
  candidate: ICandidateNew;
  loading: boolean;
  fail: IFetchError;
  successfulEdit: SuccessfulEdit;
};

export const addCandidate = (
  state: State,
  action: PayloadAction<ICandidateNew>,
) => {
  const newCandidate: ICandidateNew = action.payload;

  state.data.push(newCandidate);
};

export const getAllCandidates = (
  state: State,
  action: PayloadAction<ICandidateNew[]>,
) => {
  state.data = action.payload;
};

export const editCandidate = (
  state: State,
  action: PayloadAction<ICandidateNew>,
) => {
  state.candidate = action.payload;
};

export const getCandidate = (
  state: State,
  action: PayloadAction<ICandidateNew>,
) => {
  state.candidate = action.payload;
};

export const failFetchCandidates = (
  state: State,
  action: PayloadAction<IFetchError>,
) => {
  state.loading = false;
  state.fail = action.payload;
};

export const removeCandidate = (
  state: State,
  action: PayloadAction<number>,
) => {
  state.data = state.data.filter(
    candidate => candidate.id !== action.payload,
  );
};

export const requestFetchCandidates = (state: State) => {
  state.loading = true;
};

export const responseFetchCandidates = (state: State) => {
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
  addCandidate,
  failFetchCandidates,
  getAllCandidates,
  editCandidate,
  getCandidate,
  removeCandidate,
  requestFetchCandidates,
  responseFetchCandidates,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
};
