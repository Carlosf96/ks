import React, { useState, useEffect } from 'react';
import { Card, Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Feedback.module.scss';
import KButton from '@/components/KButton';
import { IFeedbackRead } from '@/modules/Candidates/typings';
import FeedbackCardsList from './partials/FeedbackCardsList';
import { selectorFeedbacksShowSnack } from '@/store/feedbacks/selectors';
import { setShowSnack } from '@/store/feedbacks/feedbacksSlice';
import { useDispatch, useSelector } from 'react-redux';
import KAlert from '@/components/KAlert';

interface IFeedbackProps {
  candidateId: number;
  feedbacks: IFeedbackRead[];
}

interface ICountingPoints {
  [key: number]: number;
}

const cardStyles = makeStyles({
  card: {
    boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
    marginBottom: 20,
    maxWidth: '100%',
    padding: 22,
    position: 'relative',
  },
});

const baseCountingPoints: ICountingPoints = {
  '-2': 0,
  '-1': 0,
  '0': 0,
  '1': 0,
  '2': 0,
};

const Feedback: React.FC<IFeedbackProps> = ({
  candidateId,
  feedbacks,
}: IFeedbackProps) => {
  const [points, setPoints] = useState(baseCountingPoints);
  const dispatch = useDispatch();
  const showSnack: boolean = useSelector(selectorFeedbacksShowSnack);

  useEffect(() => {
    if (feedbacks.length) {
      const countedPoints: ICountingPoints = (feedbacks as IFeedbackRead[]).reduce(
        (accumulator: ICountingPoints, current: IFeedbackRead) => {
          if (accumulator[current.score]) {
            accumulator[current.score] += 1;
          } else {
            accumulator[current.score] = 1;
          }
          return accumulator;
        },
        { ...baseCountingPoints },
      );

      setPoints(countedPoints);
    }
  }, [feedbacks]);

  const classes = cardStyles();
  const url = `/candidates/${candidateId}/add-feedback`;

  const handleClose = () => {
    dispatch(setShowSnack(false));
  };

  return (
    <div className={styles.feedbacksContainer}>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showSnack}
      >
        <KAlert severity="success">Feedback created.</KAlert>
      </Snackbar>
      <Card className={classes.card}>
        <Link className={styles.addFeedbackButton} to={url}>
          <KButton>ADD FEEDBACK</KButton>
        </Link>
        <h3 className={styles.containerTitle}>Feedback</h3>
        <div className={styles.voteContainer}>
          <ul className={styles.votes}>
            <li className={styles.positiveVoteColor}>
              +2 Strong Positive
            </li>
            <li>Votes: ({points[2]})</li>

            <li className={styles.positiveVoteColor}>+1 Positive</li>
            <li>Votes: ({points[1]})</li>

            <li className={styles.neutralVoteColor}>±0 Neutral</li>
            <li>Votes: ({points[0]})</li>

            <li className={styles.negativeVoteColor}>-1 Negative</li>
            <li>Votes: ({points[-1]})</li>

            <li className={styles.negativeVoteColor}>
              -2 Strong Negative
            </li>
            <li>Votes: ({points[-2]})</li>
          </ul>
        </div>
      </Card>

      <div className="feedback-container">
        <FeedbackCardsList feedbacks={feedbacks} />
      </div>
    </div>
  );
};
export default Feedback;
