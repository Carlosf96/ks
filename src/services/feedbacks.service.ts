import { IFeedback } from '@/modules/Candidates/typings';
import { apiClient } from './Client';

const addNew = (feedback: IFeedback): Promise<IFeedback> => {
  return apiClient
    .post<IFeedback>('/feedback', { body: feedback })
    .then((res: IFeedback) => res);
};

const deleteOne = (id: number) => {
  return apiClient
    .delete<IFeedback>(`/feedback/${id}`)
    .then(res => res);
};

const editOne = (
  id: number,
  feedback: IFeedback,
): Promise<IFeedback> => {
  return apiClient
    .put<IFeedback>(`/feedback/${id}`, { body: feedback })
    .then((res: IFeedback) => res);
};

const getAll = (): Promise<IFeedback[]> => {
  return apiClient
    .get<IFeedback[]>('/feedback')
    .then((res: Array<IFeedback>) => res);
};

const getById = (id: number): Promise<IFeedback> => {
  return apiClient
    .get<IFeedback>(`/feedback/${id}`)
    .then((res: IFeedback) => res);
};

export default {
  addNew,
  deleteOne,
  editOne,
  getAll,
  getById,
};
