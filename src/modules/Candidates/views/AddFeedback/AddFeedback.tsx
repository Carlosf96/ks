import React from 'react';
import KBaseContainer from '@/components/KBaseContainer';
import KButton from '@/components/KButton';
import KInput from '@/components/KInput';
import ScoreButtonsList from './partials/ScoreButtonsList';
import styles from './AddFeedback.module.scss';
import {
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
  Box,
} from '@material-ui/core';
import { stringRequiredValidator } from '@/utils/validations';
import { FormikProps, FormikBag, withFormik } from 'formik';
import * as Yup from 'yup';
import { RouteProps } from 'react-router-dom';
import { IFeedback } from '../../typings';

interface IAddFeedbackProps {
  addNewFeedback: (feedback: IFeedback, callback: () => void) => void;
  match: any;
  history: any;
}

interface IAddFeedbackValues {
  score: number;
  scoreExplanation: string;
}

const formStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      padding: 16,
      position: 'relative',
      maxWidth: '100%',
      boxShadow: '0 5px 30px -12px rgba(0,0,0,0.3)',
    },
    paper: {
      color: theme.palette.text.secondary,
      minHeight: 110,
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    root: {
      flexGrow: 1,
    },
  }),
);

const AddFeedback: React.FC<IAddFeedbackProps &
  FormikProps<IAddFeedbackValues> &
  RouteProps> = props => {
  const {
    values,
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
    errors,
  } = props;

  const { scoreExplanation, score } = values;

  const classes = formStyles();

  return (
    <KBaseContainer whole>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h1">Add Feedback</Typography>
      </Box>
      <Card className={classes.card} variant="outlined">
        <form
          onSubmit={handleSubmit}
          className={styles.AddFeedbackForm}
        >
          <div className={classes.root}>
            <Grid container direction="column" spacing={1}>
              <Grid item sm={12}>
                <Typography
                  className={styles.sectionTitle}
                  variant="h5"
                >
                  Overall rating
                </Typography>
                <ScoreButtonsList
                  value={score}
                  handleChange={value =>
                    setFieldValue('score', value)
                  }
                />
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h5">
                  Explain your rating
                </Typography>
                <KInput
                  name="scoreExplanation"
                  margin="normal"
                  label="Write here"
                  multiline
                  onChange={handleChange}
                  value={scoreExplanation}
                  error={errors.scoreExplanation ? true : false}
                  helperText={errors.scoreExplanation}
                />
              </Grid>
            </Grid>

            <div className={styles.formButton}>
              <KButton type="submit" disabled={isSubmitting}>
                SUBMIT
              </KButton>
            </div>
          </div>
        </form>
      </Card>
    </KBaseContainer>
  );
};

const validationSchema = Yup.object({
  scoreExplanation: stringRequiredValidator,
});

const config = {
  mapPropsToValues: () => ({
    scoreExplanation: '',
    score: 0,
  }),
  validationSchema,
  handleSubmit: (
    values: IAddFeedbackValues,
    formikBag: FormikBag<IAddFeedbackProps, IAddFeedbackValues>,
  ) => {
    formikBag.props.addNewFeedback(
      {
        score: values.score,
        comment: values.scoreExplanation,
        candidateId: Number(formikBag.props.match.params.candidateId),
      },
      () =>
        formikBag.props.history.push(
          `/candidates/${formikBag.props.match.params.candidateId}/feedback`,
        ),
    );

    formikBag.setSubmitting(false);
  },
  displayName: 'AddFeedback',
};

export default withFormik<IAddFeedbackProps, IAddFeedbackValues>(
  config,
)(AddFeedback);
