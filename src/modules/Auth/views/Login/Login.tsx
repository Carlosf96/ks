import React, { useState, useEffect } from 'react';
import styles from './Login.module.scss';
import * as Yup from 'yup';
import { stringRequiredValidator } from '@/utils/validations';
import { isError, isAuthenticated } from '@/utils/helpers';
import { withFormik, FormikProps, FormikBag } from 'formik';
import KInput from '@/components/KInput';
import KButton from '@/components/KButton';
import KAlert from '@/components/KAlert';
import {
  Grid,
  Container,
  Card,
  CardContent,
} from '@material-ui/core';
import { Link, RouteProps, useHistory } from 'react-router-dom';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { IFetchError } from '@/store/typings';

export interface ILoginValues {
  username: string;
  password: string;
}

interface ILoginProps {
  loading: boolean;
  authError: IFetchError;
  authData: any;
  login: (
    email: string,
    password: string,
    callback: () => void,
  ) => void;
  history: any;
}

const Login: React.FC<ILoginProps &
  FormikProps<ILoginValues> &
  RouteProps> = props => {
  const history = useHistory();
  const ksquareLogo = '/assets/ksquare-logo.svg';
  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
    touched,
    errors,
    // ILoginProps
    loading,
    authError,
  } = props;

  const [showMessage, setShowMessage] = useState<boolean>(
    authError.error,
  );
  if (isAuthenticated()) {
    history.push('/');
  }
  useEffect(() => {
    setShowMessage(authError.error);
  }, [authError]);

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className={styles.login}>
      <Snackbar
        autoHideDuration={3000}
        open={showMessage}
        onClose={handleCloseMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <KAlert severity="error">
          Ups! We had a problem with your session.
        </KAlert>
      </Snackbar>
      <Container className={styles.container}>
        <Card className={styles.card}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} className={styles.imgWrapper}>
                <img src={ksquareLogo} alt="logo" width="150" />
              </Grid>
            </Grid>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} md={8}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <KInput
                    id="username"
                    type="text"
                    name="username"
                    label="Username"
                    className={styles.input}
                    onChange={handleChange}
                    value={values.username}
                    error={isError(errors, 'username', touched)}
                    helperText={errors.username}
                  />

                  <KInput
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    className={styles.input}
                    onChange={handleChange}
                    value={values.password}
                    error={isError(errors, 'password', touched)}
                    helperText={errors.password}
                  />

                  <div className={styles.submitWrapper}>
                    <KButton
                      fullWidth
                      type="submit"
                      className={styles.submit}
                    >
                      {loading ? (
                        <CircularProgress size={16} />
                      ) : (
                        <span>Login</span>
                      )}
                    </KButton>
                  </div>
                </form>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} className={styles.linkWrapper}>
                <Link
                  className={styles.link}
                  to="/auth/reset-password"
                >
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item xs={12} className={styles.linkWrapper}>
                <span>Don't have an account?</span>{' '}
                <Link className={styles.link} to="/auth/signup">
                  Signup
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

const validationSchema = Yup.object({
  username: stringRequiredValidator,
  password: stringRequiredValidator,
});

const config = {
  mapPropsToValues: () => ({
    username: '',
    password: '',
  }),
  validationSchema,
  handleSubmit: (
    values: ILoginValues,
    formikBag: FormikBag<ILoginProps, ILoginValues>,
  ) => {
    formikBag.props.login(values.username, values.password, () => {
      formikBag.props.history.push('/');
    });
  },
  displayName: 'Login',
};

export default withFormik<ILoginProps, ILoginValues>(config)(Login);
