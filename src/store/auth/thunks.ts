import { AppThunk } from '@/store';
import {
  requestFetchAuth,
  authenticateUser,
  failFetchAuth,
} from '@/store/auth/authSlice';
import authService from '@/services/auth.service';

export const login = (
  email: string,
  password: string,
  callback: () => void,
): AppThunk => async dispatch => {
  dispatch(requestFetchAuth(true));
  authService
    .login(email, password)
    .then(res => {
      dispatch(authenticateUser(res));
      dispatch(requestFetchAuth(false));
      window.localStorage.setItem('user', JSON.stringify(res));
      callback();
    })
    .catch(error => {
      dispatch(requestFetchAuth(false));
      dispatch(
        failFetchAuth({
          message: error.statusText,
          status: error.status,
          error: true,
        }),
      );
    });
};
