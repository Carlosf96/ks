enum EJobStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

export interface IJob {
  id?: number;
  title: string;
  details: string;
  location: string;
  salary: string;
  vacants: number;
  status: string;
  tags?: string;
  jobCreator: string;
  jobTime: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
  department: string;
}

interface IStage {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICandidate {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  website: string;
  resume: string;
  recruiter: string;
  createdAt: Date;
  updatedAt: Date;
  stage: IStage;
}

export interface IJobRead {
  id: number;
  title: string;
  details: string;
  location: string;
  salary: string;
  vacants: number;
  status: string;
  tags?: string;
  candidates: Array<ICandidate>;
  jobCreator: string;
  jobTime: string;
  department: string;
}

export interface IJobListing {
  id: number;
  title: string;
  details: string;
  location: string;
  salary: string;
  vacants: number;
  status: string;
  tags: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export type Order = 'asc' | 'desc';
