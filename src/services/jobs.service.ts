import { IJob } from '@/modules/Jobs/typings';
import { apiClient } from './Client';

const addNew = (job: IJob): Promise<IJob> => {
  return apiClient
    .post<IJob>('/job', { body: job })
    .then((res: IJob) => res);
};

const deleteOne = (id: number) => {
  return apiClient.delete<IJob>(`/job/${id}`).then(res => res);
};

const editOne = (id: number, job: IJob): Promise<IJob> => {
  return apiClient
    .put<IJob>(`/job/${id}`, { body: job })
    .then((res: IJob) => res);
};

const getAll = (): Promise<IJob[]> => {
  return apiClient
    .get<IJob[]>('/job')
    .then((res: Array<IJob>) => res);
};

const getById = (id: number): Promise<IJob> => {
  return apiClient.get<IJob>(`/job/${id}`).then((res: IJob) => res);
};

export default {
  addNew,
  deleteOne,
  editOne,
  getAll,
  getById,
};
