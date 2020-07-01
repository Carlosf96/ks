import * as React from 'react';
import { TextField, Card } from '@material-ui/core/';
import { LocalPhone, Email, Link } from '@material-ui/icons/';
//TODO: ICandidate needs to be deleted from the whole app before production.
import { ICandidate } from '@/modules/Candidates/typings';
import styles from './CandidateInfo.module.scss';

interface ICandidateInfoProps {
  candidateInfo: ICandidate;
}

const CandidateInfo: React.FC<ICandidateInfoProps> = props => {
  const { email, phone, website } = props.candidateInfo;
  return (
    <Card>
      <div className={styles.main}>
        <div className={styles.infoList}>
          <span className={styles.info}>
            <Email fontSize="small" className={styles.icon} />
            <a href={`mailto:${email}`} className={styles.link}>
              {email}
            </a>
          </span>
          <span className={styles.info}>
            <LocalPhone fontSize="small" className={styles.icon} />
            <a href={`tel:+${phone}`} className={styles.link}>
              {phone}
            </a>
          </span>
          <span className={styles.info}>
            <Link fontSize="small" className={styles.icon} />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {website}
            </a>
          </span>
        </div>
        <TextField
          id="standard-helperText"
          label="Note"
          defaultValue="add a note"
          fullWidth
          multiline
          rows={3}
        />
      </div>
    </Card>
  );
};

export default CandidateInfo;
