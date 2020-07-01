import React from 'react';
import styles from './UserSettingsForm.module.scss';
import { FormikProps } from 'formik';
import KButton from '@/components/KButton';
import KInput from '@/components/KInput';
import { Avatar, Card, Grid } from '@material-ui/core';
import KSelect from '@/components/KSelect';

export interface IFormValues {
  confirmPassword: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: string;
}

const UserSettingsForm: React.FC<FormikProps<
  IFormValues
>> = props => {
  const {
    errors,
    isSubmitting,
    touched,
    values: {
      confirmPassword,
      email,
      firstname,
      lastname,
      password,
      role,
    },
    handleBlur,
    handleChange,
    handleSubmit,
  } = props;
  return (
    <Grid container className={styles.settingsFormContainer}>
      <Grid item xs={12} className={styles.card}>
        <Card className={styles.card}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Grid container className={styles.headerContainer}>
              <Grid
                item
                xs={12}
                sm={6}
                className={styles.textWrapper}
              >
                <Avatar
                  className={styles.avatarText}
                  alt="KS"
                  src="/static/images/avatar/1.jpg" //TODO: use real images or letters
                >
                  {firstname.toUpperCase().charAt(0) || 'KS'}
                  {lastname.toUpperCase().charAt(0)}
                </Avatar>
              </Grid>
            </Grid>

            <div className={styles.inputsCard}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <h4 className={styles.userInformationSection}>
                    User information
                  </h4>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <KInput
                    error={Boolean(
                      errors.firstname && touched.firstname,
                    )}
                    helperText={touched.firstname && errors.firstname}
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    type="text"
                    value={firstname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <KInput
                    error={Boolean(
                      errors.lastname && touched.lastname,
                    )}
                    helperText={touched.lastname && errors.lastname}
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    type="text"
                    value={lastname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <KSelect
                    disabled
                    error={Boolean(errors.role && touched.role)}
                    helperText={touched.role && errors.role}
                    id="role"
                    label="Role"
                    name="role"
                    value={role}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    options={[
                      { value: 'Admin', label: 'Admin' },
                      { value: 'Recruiter', label: 'Recruiter' },
                      { value: 'Interviewer', label: 'Interviewer' },
                    ]}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <h4 className={styles.accountSection}>
                    Account information
                  </h4>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <KInput
                    error={Boolean(errors.email && touched.email)}
                    helperText={touched.email && errors.email}
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <KInput
                    error={Boolean(
                      errors.password && touched.password,
                    )}
                    helperText={touched.password && errors.password}
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <KInput
                    error={Boolean(
                      errors.confirmPassword &&
                        touched.confirmPassword,
                    )}
                    helperText={
                      touched.confirmPassword &&
                      errors.confirmPassword
                    }
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    required={true}
                    type="password"
                    value={confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </div>

            <div className={styles.footerContainer}>
              <div className={styles.submittButton}>
                <KButton disabled={isSubmitting} type="submit">
                  SAVE
                </KButton>
              </div>
            </div>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserSettingsForm;
