import { AppThunk } from '@/store';
import { ICandidateNew } from '@/modules/Candidates/typings';
import {
  addCandidate,
  failFetchCandidates,
  getCandidate,
  getAllCandidates,
  removeCandidate,
  requestFetchCandidates,
  responseFetchCandidates,
  beginEdit,
  endEdit,
  successfulEdit,
  errorEdit,
} from '@/store/candidates/candidatesSlice';
import candidatesService from '@/services/candidates.service';

export const addNewCandidate = (
  candidate: ICandidateNew,
  callback: () => void,
): AppThunk => async dispatch => {
  dispatch(requestFetchCandidates());

  candidatesService
    .addNew(candidate)
    .then(res => {
      dispatch(addCandidate(res));
      callback();
    })
    .catch(err =>
      dispatch(
        failFetchCandidates({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchCandidates());
};

export const deleteCandidate = (
  id: number,
): AppThunk => async dispatch => {
  dispatch(requestFetchCandidates());

  candidatesService
    .deleteOne(id)
    .then(() => dispatch(removeCandidate(id)))
    .catch(err =>
      dispatch(
        failFetchCandidates({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchCandidates());
};

export const getCandidates = (): AppThunk => async dispatch => {
  dispatch(requestFetchCandidates());

  candidatesService
    .getAll()
    .then(res => dispatch(getAllCandidates(res)))
    .catch(err =>
      dispatch(
        failFetchCandidates({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchCandidates());
};
export const getOneCandidate = (
  id: number,
): AppThunk => async dispatch => {
  dispatch(requestFetchCandidates());

  candidatesService
    .getById(id)
    .then(res => dispatch(getCandidate(res)))
    .catch(err =>
      dispatch(
        failFetchCandidates({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchCandidates());
};

export const editOneCandidate = (
  id: number,
  candidate: ICandidateNew,
  cb: () => void,
): AppThunk => async dispatch => {
  try {
    dispatch(beginEdit());
    await candidatesService.editOne(id, candidate);
    dispatch(
      successfulEdit({
        message: 'Edit Successful',
        success: true,
      }),
    );
    cb();
  } catch (e) {
    dispatch(errorEdit({ message: 'Edit failed', success: false }));
  }
  dispatch(endEdit());
};
