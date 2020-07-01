import { ICandidateNew } from '@/modules/Candidates/typings';
import { apiClient } from './Client';

const addNew = (candidate: ICandidateNew): Promise<ICandidateNew> => {
  return apiClient
    .post<ICandidateNew>('/candidate', {
      body: candidate,
    })
    .then((res: ICandidateNew) => res);
};

const deleteOne = (id: number) => {
  return apiClient.delete<ICandidateNew>(`/candidate/${id}`);
};

const editOne = (
  id: number,
  candidate: ICandidateNew,
): Promise<ICandidateNew> => {
  return apiClient
    .put<ICandidateNew>(`/candidate/${id}`, { body: candidate })
    .then((res: ICandidateNew) => res);
};

const getAll = (): Promise<ICandidateNew[]> => {
  return apiClient
    .get<ICandidateNew[]>('/candidate')
    .then((res: Array<ICandidateNew>) => res);
};

const getById = (id: number): Promise<ICandidateNew> => {
  return apiClient
    .get<ICandidateNew>(`/candidate/${id}`)
    .then((res: ICandidateNew) => res);
};

export default {
  addNew,
  deleteOne,
  editOne,
  getAll,
  getById,
};
