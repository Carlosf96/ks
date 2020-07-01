import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './FeedbackCardsList.module.scss';
import { IFeedbackRead } from '@/modules/Candidates/typings';
import KAvatar from '@/components/KAvatar';
import LongMenu from '../LongMenu';

interface IFeedbackProps {
  feedbacks: IFeedbackRead[];
}

const cardStyles = makeStyles({
  card: {
    position: 'relative',
    maxWidth: '100%',
    marginBottom: 20,
    padding: 22,
    boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
  },
});

const FeedbackCardsList: React.FC<IFeedbackProps> = ({
  feedbacks,
}: IFeedbackProps) => {
  const classes = cardStyles();

  const feedbackCardsList = feedbacks
    .slice()
    .reverse()
    .map((feedback: IFeedbackRead, idx) => {
      const userName = `${feedback.user.firstName} ${feedback.user.lastName}`;

      return (
        <Card key={userName + idx} className={classes.card}>
          <div className={styles.reviewerFeedbackHeader}>
            <div className={styles.displaySmallInlineBlock}>
              <div className={styles.feedbackKAvatar}>
                <KAvatar name={userName} />
              </div>
            </div>
            <h5>
              {userName}
              <small className={styles.neutralVoteColor}>
                &nbsp; left interviewer feedback
              </small>
              <time
                className={styles.reviewerFeedbackDate}
                dateTime="2008-02-14 20:00"
              >
                {/* TODO: make this use actual date */}
                2008-02-14 20:00
              </time>
            </h5>
          </div>
          <div className={styles.reviewerVote}>
            Reviewer Points: {feedback.score}
          </div>

          <p>{feedback.comment}</p>

          <div className={styles.longMenuPosition}>
            <LongMenu />
          </div>
        </Card>
      );
    });

  return (
    <div className="card-list-container">{feedbackCardsList}</div>
  );
};

export default FeedbackCardsList;
