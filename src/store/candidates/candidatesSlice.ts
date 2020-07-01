import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const today = new Date().toString();
const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    loading: false,
    data: [],
    candidate: {
      id: 0,
      firstName: '',
      lastName: '',
      recruiter: '',
      employer: '',
      email: '',
      phone: '',
      website: '',
      createdAt: today,
      jobs: [
        {
          id: 0,
          title: '',
          location: '',
          details: '',
          status: '',
          tags: '',
        },
      ],
      stage: {
        id: 0,
        name: '',
        details: '',
      },
      feedbacks: [],
      resume: '',
    },
    successfulEdit: {
      message: '',
      success: false,
    },
    fail: {
      message: ' ',
      status: 200,
      error: false,
    },
  },
  reducers,
});

export const {
  addCandidate,
  failFetchCandidates,
  editCandidate,
  getAllCandidates,
  getCandidate,
  removeCandidate,
  requestFetchCandidates,
  responseFetchCandidates,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
} = candidatesSlice.actions;

export default candidatesSlice.reducer;
