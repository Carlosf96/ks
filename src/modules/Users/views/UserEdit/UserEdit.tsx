import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import * as Yup from 'yup';

import { IUser } from '@/modules/Users/typings';
import { getUser, editUser } from '@/store/users/thunks';
import {
  sel_userData,
  sel_edit_success,
} from '@/store/users/selectors';
import { KFieldGroup } from '@/components/KForm/KForm';
import KForm from '@/components/KForm';
import KBaseContainer from '@/components/KBaseContainer';
import KAlert from '@/components/KAlert';

const validationSchema = Yup.object({
  email: Yup.string().required(),
});

const UserEdit = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { success, message: errorMessage } = useSelector(
    sel_edit_success,
  );
  const { id, firstName, lastName, email }: IUser = useSelector(
    sel_userData,
  );

  const handleSubmit = (values: any) => {
    if (id !== undefined && id !== null) {
      dispatch(
        editUser(id, values, () => {
          history.push('/users');
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(getUser(Number(userId)));
  }, [dispatch, userId]);

  useEffect(() => {
    if (errorMessage !== '' && !success) {
      setMessage(errorMessage);
      setShowMessage(!success);
    }
  }, [errorMessage, success]);

  const components: KFieldGroup[] = [
    {
      name: 'User information',
      fields: [
        {
          fieldProps: { label: 'First Name', name: 'firstName' },
          initialValue: firstName,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Last Name', name: 'lastName' },
          initialValue: lastName,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Email', name: 'email' },
          initialValue: email,
          type: 'text',
          layoutSize: 6,
        },
      ],
    },
  ];
  return (
    <KBaseContainer>
      <h1>Edit User</h1>
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
      {firstName === '' ? (
        <p>...loading</p>
      ) : (
        <KForm
          fieldsGroups={components}
          validationSchema={validationSchema}
          onSuccess={handleSubmit}
          buttonText="Update"
        />
      )}
    </KBaseContainer>
  );
};

export default UserEdit;
