import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';

import styles from './JobDetails.module.scss';

interface IJobDetailsProps {
  details: {
    title: string;
    id: number;
    location: string;
    department?: string;
    salary: string;
    jobCreator?: string;
    aplicationForm?: string;
    jobType?: string;
    jobTime?: string;
    groupHiringFor?: string | null;
    practiceDepartment?: string | null;
    priority?: string | null;
  };
}

const JobDetails: FC<IJobDetailsProps> = props => {
  const {
    title,
    id,
    location,
    department,
    salary,
    jobCreator,
    aplicationForm,
    jobType,
    jobTime,
    groupHiringFor,
    practiceDepartment,
    priority,
  } = props.details;

  const groupHiringForRender = groupHiringFor ? (
    <Typography variant="body2">{groupHiringFor}</Typography>
  ) : (
    <Typography variant="body2" className={styles.disabledText}>
      No Group Hiring for
    </Typography>
  );

  const practiceDepartmentRender = practiceDepartment ? (
    <Typography variant="body2">{practiceDepartment}</Typography>
  ) : (
    <Typography variant="body2" className={styles.disabledText}>
      No Practice Department
    </Typography>
  );

  const priorityRender = priority ? (
    <Typography variant="body2">{priority}</Typography>
  ) : (
    <Typography variant="body2" className={styles.disabledText}>
      No Priority
    </Typography>
  );

  const jobCreatorRender = jobCreator ? (
    <Typography variant="body2">{jobCreator}</Typography>
  ) : (
    <Typography variant="body2">No job creator specified</Typography>
  );

  const departmentRender = department ? (
    <Typography variant="body2">{department}</Typography>
  ) : (
    <Typography variant="body2">No deparment specified</Typography>
  );

  const aplicationFormRender = aplicationForm ? (
    <Typography variant="body2">{aplicationForm}</Typography>
  ) : (
    <Typography variant="body2">
      No aplication form specified
    </Typography>
  );

  const jobTimeRender = jobTime ? (
    <Typography variant="body2">{jobTime}</Typography>
  ) : (
    <Typography variant="body2">No job time specified</Typography>
  );

  const jobTypeRender = jobType ? (
    <Typography variant="body2">{jobType}</Typography>
  ) : (
    <Typography variant="body2">No job type specified</Typography>
  );

  return (
    <div className={styles.jobDetails}>
      <Typography variant="h5">Job Details</Typography>

      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.item}>
            <Typography variant="subtitle2">Job Title</Typography>
            <Typography variant="body2">{title}</Typography>
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Req ID</Typography>
            <Typography variant="body2">{id}</Typography>
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Location</Typography>
            <Typography variant="body2">{location}</Typography>
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Department</Typography>
            {departmentRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Salary</Typography>
            <Typography variant="body2">{salary}</Typography>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.item}>
            <Typography variant="subtitle2">Job Creator</Typography>
            {jobCreatorRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">
              Application form
            </Typography>
            {aplicationFormRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Job type</Typography>
            {jobTypeRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">Job time</Typography>
            {jobTimeRender}
          </div>
        </div>
      </div>

      <div className={styles.item}>
        <Typography
          variant="subtitle2"
          className={styles.aditionalDetails}
        >
          Aditional Details
        </Typography>
      </div>

      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.item}>
            <Typography variant="subtitle2">
              Group Hiring For
            </Typography>
            {groupHiringForRender}
          </div>

          <div className={styles.item}>
            <Typography variant="subtitle2">
              Practice Department
            </Typography>
            {practiceDepartmentRender}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.item}>
            <Typography variant="subtitle2">Priority</Typography>
            {priorityRender}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
