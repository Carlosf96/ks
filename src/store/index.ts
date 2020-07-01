import {
  configureStore,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import jobsReducer from './jobs/jobsSlice';
import candidatesReducer from './candidates/candidatesSlice';
import usersReducer from './users/usersSlice';
import authReducers from './auth/authSlice';
import feedbacksReducer from './feedbacks/feedbacksSlice';

// TODO: All reducers will be added here.
const rootReducer = combineReducers({
  auth: authReducers,
  jobs: jobsReducer,
  candidates: candidatesReducer,
  feedbacks: feedbacksReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
>;

export default store;
