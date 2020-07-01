import { IUser } from '@/modules/Users/typings';
import { apiClient } from './Client';

const addNew = (user: IUser): Promise<IUser> => {
  return apiClient
    .post<IUser>('/auth/register/', { body: user })
    .then((res: IUser) => res);
};

const deleteOne = (id: number) => {
  return apiClient.delete<IUser>(`/user/${id}`).then(res => res);
};

const editOne = (id: number, user: IUser): Promise<IUser> => {
  return apiClient
    .put<IUser>(`/user/${id}`, { body: user })
    .then((res: IUser) => res);
};

const getAll = (): Promise<IUser[]> => {
  return apiClient
    .get<IUser[]>('/user')
    .then((res: Array<IUser>) => res);
};

const getById = (id: number): Promise<IUser> => {
  return apiClient
    .get<IUser>(`/user/${id}`)
    .then((res: IUser) => res);
};

export default {
  addNew,
  deleteOne,
  editOne,
  getAll,
  getById,
};
