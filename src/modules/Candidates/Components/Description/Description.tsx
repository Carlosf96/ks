import * as React from 'react';
import { FC } from 'react';
import { Avatar, IconButton, Card } from '@material-ui/core/';
import { MoreVert } from '@material-ui/icons';
//TODO: ICandidate needs to be deleted from the whole app before production.
import { ICandidate } from '@/modules/Candidates/typings';
import styles from './Description.module.scss';

interface IDescriptionProps {
  candidateData: ICandidate;
}

const Description: FC<IDescriptionProps> = props => {
  const { candidateData } = props;
  const {
    firstName,
    lastName,
    jobTitle,
    status,
    stage,
    created,
    recruiters,
  } = candidateData;

  const recruitersList = recruiters
    .map(recruiter => recruiter.name)
    .join(', ');

  return (
    <div className={styles.main}>
      <Card>
        <div className={styles.cardHeader}>
          <div className={styles.avatar}>
            <Avatar className={styles.avatarImage}>
              {firstName.charAt(0)}
            </Avatar>
            <div className={styles.avatarNameDate}>
              <h2 className={styles.avatarName}>
                {firstName} {lastName}
              </h2>
              <p className={styles.avatarDate}>
                <b>{created.toDateString()}</b>
              </p>
            </div>
          </div>
          <IconButton>
            <MoreVert className={styles.iconEdit} />
          </IconButton>
        </div>
        <div className={styles.candidateInfo}>
          <p className={styles.info}>Job title: {jobTitle}</p>
          <p className={styles.info}>Recruiters: {recruitersList}</p>
          <p className={styles.info}>Stage: {stage}</p>
          <p className={styles.info}>Status: {status}</p>
        </div>
      </Card>
    </div>
  );
};

export default Description;
