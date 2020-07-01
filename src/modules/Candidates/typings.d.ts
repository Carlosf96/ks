import { User } from '@/modules/Users/typings';

//TODO: ICandidate needs to be deleted from the whole app before production.
export interface ICandidate {
  id: number;
  firstName: string;
  lastName: string;
  created: Date;
  email: string;
  employer: string;
  jobTitle: string;
  phone: string;
  positions: string[];
  recruiters: User[];
  stage: 'hired' | 'rejected' | 'prospective' | 'active';
  status: string;
  website: string;
  //options?: { [key: string]: string };
}

export interface ICandidateNew {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  website: string;
  resume: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  stageId?: number;
  position?: number;
  stage?: IStage;
  // recruiter: string;
}

export interface IFeedback {
  userId?: number;
  userName?: string;
  score: number;
  comment: string;
  candidateId?: number;
}

interface IJobListing {
  id: number;
  title: string;
  location: string;
  details: string;
  status: string;
  tags: string;
}

interface IStage {
  id: number;
  name: string;
  details: string;
}

export interface ICandidateListing {
  id: number;
  firstName: string;
  lastName: string;
  website: string;
  recruiter: string;
  createdAt: Date;
  jobs: IJobListing[];
  stage: IStage;
}

interface IJobRead {
  id: number;
  title: string;
  location: string;
  details: string;
  status: string;
  tags: string;
}

interface IUserRead {
  id: number;
  firstName: string;
  lastName: string;
}

interface IStageRead {
  id: number;
  name: string;
  details: string;
}

interface IFeedbackRead {
  id: number;
  comment: string;
  score: number;
  createdAt: Date;
  user: IUserRead;
}

export interface ICandidateRead {
  id: number;
  firstName: string;
  lastName: string;
  recruiter: string;
  employer: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  jobs: IJobRead[];
  stage?: IStageRead;
  feedbacks: IFeedbackRead[];
}
