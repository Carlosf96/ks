import React, { FC } from 'react';

import { User } from '@/modules/Users/typings';
import Typography from '@material-ui/core/Typography';

import styles from './HiringTeam.module.scss';

interface IHiringTeamProps {
  interviewers: Array<User>;
  managers: Array<User>;
  recruiters: Array<User>;
}

const HiringTeam: FC<IHiringTeamProps> = props => {
  const managers = props.managers.map(manager => (
    <div className={styles.hiringTeam} key={manager.name}>
      {/* <img alt={`Manager ${manager.name}`} src={manager.picture} /> */}
      <img
        alt={`Manager ${manager.name}`}
        src="https://via.placeholder.com/20x20"
        className={styles.teamPicture}
      />
      <Typography variant="body2" className={styles.teamName}>
        {manager.name}
      </Typography>
    </div>
  ));

  const recruiters = props.recruiters.map(recruiter => (
    <div className={styles.hiringTeam} key={recruiter.name}>
      {/* <img alt={`Recruiter ${recruiter.name}`} src={recruiter.picture} /> */}
      <img
        alt={`Recruiter ${recruiter.name}`}
        src="https://via.placeholder.com/20x20"
        className={styles.teamPicture}
      />
      <Typography variant="body2" className={styles.teamName}>
        {recruiter.name}
      </Typography>
    </div>
  ));

  const interviewers = props.interviewers.map(interviewer => (
    <div className={styles.hiringTeam} key={interviewer.name}>
      {/* <img alt={`Coordinator ${interviewer.name}`} src={interviewer.picture} /> */}
      <img
        alt={`Coordinator ${interviewer.name}`}
        src="https://via.placeholder.com/20x20"
        className={styles.teamPicture}
      />
      <Typography variant="body2" className={styles.teamName}>
        {interviewer.name}
      </Typography>
    </div>
  ));

  return (
    <div className={styles.hiringTeamContainer}>
      <Typography variant="h5">Hiring team</Typography>

      <div className={styles.item}>
        <Typography variant="subtitle2" className={styles.team}>
          Hiring Managers
        </Typography>
        {managers}
      </div>

      <div className={styles.item}>
        <Typography variant="subtitle2" className={styles.team}>
          Recruiters
        </Typography>
        {recruiters}
      </div>

      <div className={styles.item}>
        <Typography variant="subtitle2" className={styles.team}>
          Interviewers
        </Typography>
        {interviewers}
      </div>
    </div>
  );
};

export default HiringTeam;
