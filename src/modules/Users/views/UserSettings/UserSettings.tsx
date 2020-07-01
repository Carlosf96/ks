import KBaseContainer from '@/components/KBaseContainer';
import UserSettingsForm, {
  IFormValues,
} from '@/modules/Users/components/UserSettingsForm/UserSettingsForm';
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
  stringRequiredValidator,
  usernameValidator,
} from '@/utils/validations';
import { Formik, FormikHelpers } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import styles from './UserSettings.module.scss';

const validationSchema = Yup.object({
  confirmPassword: confirmPasswordValidator,
  email: emailValidator,
  firstname: usernameValidator,
  lastname: usernameValidator,
  password: passwordValidator,
  role: stringRequiredValidator,
});

const UserSettingsInitialValues = {
  confirmPassword: '',
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  role: '',
};

const UserSettings: React.FC = () => {
  const handleSubmit = (
    values: IFormValues,
    actions: FormikHelpers<IFormValues>,
  ) => {
    actions.setSubmitting(false);
  };

  return (
    <div className={styles.view}>
      <KBaseContainer>
        <h1 className={styles.header}>User Settings</h1>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={UserSettingsInitialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            displayName="UserSettingsForm"
          >
            {props => <UserSettingsForm {...props} />}
          </Formik>
        </div>
      </KBaseContainer>
    </div>
  );
};

export default UserSettings;
