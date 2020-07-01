import { createSlice } from '@reduxjs/toolkit';
import reducers from './reducers';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    data: null,
    fail: {
      message: '',
      status: 200,
      error: false,
    },
  },
  reducers,
});

export const {
  requestFetchAuth,
  authenticateUser,
  failFetchAuth,
} = authSlice.actions;

export default authSlice.reducer;
