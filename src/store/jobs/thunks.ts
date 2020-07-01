import { AppThunk } from '@/store';
import { IJob } from '@/modules/Jobs/typings';
import {
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
} from '@/store/jobs/jobsSlice';
import jobService from '@/services/jobs.service';

export const addNewJob = (job: IJob): AppThunk => async dispatch => {
  dispatch(requestFetchJobs());

  jobService
    .addNew(job)
    .then(res => dispatch(addJob(res)))
    .catch(err =>
      dispatch(
        failFetchJobs({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchJobs());
};

export const deleteJob = (id: number): AppThunk => async dispatch => {
  dispatch(requestFetchJobs());

  jobService
    .deleteOne(id)
    .then(() => dispatch(removeJob(id)))
    .catch(err =>
      dispatch(
        failFetchJobs({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchJobs());
};

export const getJobs = (): AppThunk => async dispatch => {
  dispatch(requestFetchJobs());

  jobService
    .getAll()
    .then(res => dispatch(getAllJobs(res)))
    .catch(err =>
      dispatch(
        failFetchJobs({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchJobs());
};

export const getJob = (id: number): AppThunk => async dispatch => {
  dispatch(requestFetchJobs());

  jobService
    .getById(id)
    .then(res => dispatch(getOneJob(res)))
    .catch(err =>
      dispatch(
        failFetchJobs({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchJobs());
};

export const editJob = (
  id: number,
  job: IJob,
  cb: () => void,
): AppThunk => async dispatch => {
  try {
    dispatch(beginEdit());
    await jobService.editOne(id, job);
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
