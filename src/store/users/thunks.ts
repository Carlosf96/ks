import { AppThunk } from '@/store';
import { IUser } from '@/modules/Users/typings';
import {
  failFetchUsers,
  getAllUsers,
  getOneUser,
  removeUser,
  requestFetchUsers,
  responseFetchUsers,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
} from '@/store/users/usersSlice';
import userService from '@/services/users.service';

export const addNewUser = (
  User: IUser,
  cb: () => void,
): AppThunk => async dispatch => {
  dispatch(beginEdit());

  userService
    .addNew(User)
    .then(res => {
      dispatch(
        successfulEdit({
          message: 'Edit Successful',
          success: true,
        }),
      );
      cb();
    })
    .catch(err => {
      dispatch(
        errorEdit({
          message:
            err.status === 403
              ? 'Email already in use'
              : 'Error Creating User',
          success: false,
        }),
      );
    });

  dispatch(endEdit());
};

export const deleteUser = (
  id: number,
): AppThunk => async dispatch => {
  dispatch(requestFetchUsers());

  userService
    .deleteOne(id)
    .then(() => dispatch(removeUser(id)))
    .catch(err =>
      dispatch(
        failFetchUsers({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchUsers());
};

export const getUsers = (): AppThunk => async dispatch => {
  dispatch(requestFetchUsers());

  userService
    .getAll()
    .then(res => dispatch(getAllUsers(res)))
    .catch(err =>
      dispatch(
        failFetchUsers({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchUsers());
};

export const getUser = (id: number): AppThunk => async dispatch => {
  dispatch(requestFetchUsers());

  userService
    .getById(id)
    .then(res => dispatch(getOneUser(res)))
    .catch(err =>
      dispatch(
        failFetchUsers({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchUsers());
};
export const editUser = (
  id: number,
  user: IUser,
  cb: () => void,
): AppThunk => async dispatch => {
  try {
    dispatch(beginEdit());
    await userService.editOne(id, user);
    dispatch(
      successfulEdit({
        message: 'Edit Successful',
        success: true,
      }),
    );
    cb();
  } catch (e) {
    dispatch(errorEdit({ message: e, success: false }));
  }
  dispatch(endEdit());
};
