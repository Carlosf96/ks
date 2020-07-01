import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import {
  usernameValidator,
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
  stringRequiredValidator,
} from '@/utils/validations';
import { addNewUser } from '@/store/users/thunks';
import { sel_edit_success } from '@/store/users/selectors';
import UserCreationForm, {
  IFormValues,
} from '@/modules/Users/components/UserCreationForm/UserCreationForm';
import KBaseContainer from '@/components/KBaseContainer';
import styles from './UserCreation.module.scss';
import KAlert from '@/components/KAlert';

const validationSchema = Yup.object({
  confirmPassword: confirmPasswordValidator,
  email: emailValidator,
  firstName: usernameValidator,
  lastName: usernameValidator,
  password: passwordValidator,
  roleId: stringRequiredValidator,
});

const UserCreationInitialValues = {
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  roleId: '',
};

const UserCreation: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { message: errorMessage, success } = useSelector(
    sel_edit_success,
  );
  const handleSubmit = (
    values: any,
    actions: FormikHelpers<IFormValues>,
  ) => {
    dispatch(
      addNewUser(values, () => {
        history.push('/users');
      }),
    );
    actions.setSubmitting(false);
  };
  useEffect(() => {
    if (errorMessage !== '' && !success) {
      setMessage(errorMessage);
      setShowMessage(!success);
    }
  }, [errorMessage, success]);

  return (
    <div className={styles.view}>
      <KBaseContainer>
        <Snackbar
          autoHideDuration={3000}
          open={showMessage}
          onClose={() => setShowMessage(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <KAlert severity="error">{message}</KAlert>
        </Snackbar>
        <h1 className={styles.header}>Add User</h1>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={UserCreationInitialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            displayName="UserForm"
          >
            {props => <UserCreationForm {...props} />}
          </Formik>
        </div>
      </KBaseContainer>
    </div>
  );
};

export default UserCreation;
