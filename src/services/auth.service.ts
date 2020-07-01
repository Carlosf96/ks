import { apiClient } from './Client';
import { IAuth } from '@/modules/Auth/typings';

const login = (email: string, password: string): Promise<IAuth> => {
  return apiClient
    .post<IAuth>('/auth/login', {
      body: {
        email,
        password,
      },
    })
    .then((res: IAuth) => res);
};

export default {
  login,
};
