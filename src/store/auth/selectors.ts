import { RootState } from '@/store';

export const selectorAuthData = (state: RootState) => state.auth.data;
export const selectorAuthLoading = (state: RootState) =>
  state.auth.loading;
export const selectorAuthFail = (state: RootState) => state.auth.fail;
