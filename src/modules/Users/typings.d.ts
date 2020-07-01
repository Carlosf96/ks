import { string } from 'yup';

export type User = {
  name: string;
  picture?: string;
  role: string;
};

export interface IRole {
  id: number;
  level: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserListing {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  role: IRole;
}

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  password: string;
  roleId?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
