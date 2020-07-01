import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    loading: true,
    all: [],
    one: {
      id: 0,
      title: '',
      location: '',
      details: '',
      salary: '',
      vacants: 0,
      status: '',
      // options: '',
      tags: '',
      candidates: [],
      jobCreator: '',
      jobTime: '',
      department: '',
    },
    successfulEdit: {
      message: '',
      success: false,
    },
    fail: {
      message: ' ',
      status: 0,
      error: false,
    },
  },
  reducers,
});

export const {
  addJob,
  failFetchJobs,
  getAllJobs,
  getOneJob,
  removeJob,
  requestFetchJobs,
  responseFetchJobs,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
} = jobsSlice.actions;

export default jobsSlice.reducer;
