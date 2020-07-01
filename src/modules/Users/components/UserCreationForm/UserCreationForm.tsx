import React from 'react';
import { Avatar, Card, Grid } from '@material-ui/core';
import { FormikProps } from 'formik';
import KButton from '@/components/KButton';
import KInput from '@/components/KInput';
import KSelect from '@/components/KSelect';
import styles from './UserCreationForm.module.scss';

export interface IFormValues {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roleId: string;
}

const UserCreationForm: React.FC<FormikProps<
  IFormValues
>> = props => {
  const {
    errors,
    isSubmitting,
    touched,
    values: {
      confirmPassword,
      email,
      firstName,
      lastName,
      password,
      roleId,
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
                  src="/broken-image.jpg" //TODO: use real images or letters
                >
                  {firstName.toUpperCase().charAt(0) || 'KS'}
                  {lastName.toUpperCase().charAt(0)}
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
                      errors.firstName && touched.firstName,
                    )}
                    helperText={touched.firstName && errors.firstName}
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <KInput
                    error={Boolean(
                      errors.lastName && touched.lastName,
                    )}
                    helperText={touched.lastName && errors.lastName}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={lastName}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <KSelect
                    error={Boolean(errors.roleId && touched.roleId)}
                    fullWidth
                    helperText={touched.roleId && errors.roleId}
                    id="role"
                    label="Role"
                    name="roleId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    options={[
                      { value: 1, label: 'Admin' },
                      { value: 2, label: 'Recruiter' },
                      { value: 3, label: 'Interviewer' },
                    ]}
                    value={roleId}
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
                <Grid item xs={12} sm={12}>
                  <KInput
                    error={Boolean(errors.email && touched.email)}
                    helperText={touched.email && errors.email}
                    id="email"
                    label="Email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={email}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <KInput
                    error={Boolean(
                      errors.password && touched.password,
                    )}
                    helperText={touched.password && errors.password}
                    id="password"
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={password}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
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
                  ADD
                </KButton>
              </div>
            </div>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserCreationForm;
