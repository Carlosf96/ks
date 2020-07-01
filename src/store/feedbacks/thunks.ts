import { AppThunk } from '@/store';
import { IFeedback } from '@/modules/Candidates/typings';
import {
  addFeedback,
  failFetchFeedbacks,
  getAllFeedbacks,
  removeFeedback,
  requestFetchFeedbacks,
  responseFetchFeedbacks,
  setShowSnack,
} from '@/store/feedbacks/feedbacksSlice';
import feedbackService from '@/services/feedbacks.service';

export const addNewFeedback = (
  feedback: IFeedback,
  callback: () => void,
): AppThunk => async dispatch => {
  dispatch(requestFetchFeedbacks());

  feedbackService
    .addNew(feedback)
    .then(res => {
      dispatch(addFeedback(res));
      callback();
      dispatch(setShowSnack(true));
    })
    .catch(err =>
      dispatch(
        failFetchFeedbacks({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchFeedbacks());
};

export const deleteFeedback = (
  id: number,
): AppThunk => async dispatch => {
  dispatch(requestFetchFeedbacks());

  feedbackService
    .deleteOne(id)
    .then(() => dispatch(removeFeedback(id)))
    .catch(err =>
      dispatch(
        failFetchFeedbacks({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchFeedbacks());
};

export const getJobs = (): AppThunk => async dispatch => {
  dispatch(requestFetchFeedbacks());

  feedbackService
    .getAll()
    .then(res => dispatch(getAllFeedbacks(res)))
    .catch(err =>
      dispatch(
        failFetchFeedbacks({
          message: err.message,
          status: err.status,
          error: true,
        }),
      ),
    );

  dispatch(responseFetchFeedbacks());
};
