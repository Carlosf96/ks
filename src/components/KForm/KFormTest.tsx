import React from 'react';
import KForm from '@/components/KForm';
import * as Yup from 'yup';
import {
  usernameValidator,
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
  stringRequiredValidator,
} from '@/utils/validations';
import { KFieldGroup } from './KForm';
import styles from './KFormTest.module.scss';
import { Card } from '@material-ui/core';

const KFormTest = () => {
  const components: KFieldGroup[] = [
    {
      name: 'User Information',
      spacing: 3,
      fields: [
        {
          fieldProps: {
            label: 'First name',
            name: 'firstname',
          },
          layoutSize: 6,
          initialValue: '',
          type: 'text',
        },
        {
          fieldProps: {
            label: 'Last name',
            name: 'lastname',
          },
          layoutSize: 6,
          initialValue: '',
          type: 'text',
        },
        {
          fieldProps: {
            label: 'Role',
            name: 'role',
            options: [
              { value: 'female', label: 'Female' },
              { value: 'male', label: 'Male' },
              { value: 'other', label: 'Other' },
            ],
          },
          layoutSize: 6,
          initialValue: '',
          type: 'select',
        },
      ],
    },
    {
      name: 'Account Information',
      spacing: 3,
      fields: [
        {
          fieldProps: {
            label: 'Email',
            name: 'email',
            type: 'email',
          },
          initialValue: '',
          layoutSize: 6,
          type: 'text',
        },
        {
          fieldProps: {
            label: 'Password',
            name: 'password',
            type: 'password',
          },
          initialValue: '',
          layoutSize: 6,
          type: 'text',
        },
        {
          fieldProps: {
            label: 'confirm Password',
            name: 'confirmPassword',
            required: true,
            type: 'password',
          },
          initialValue: '',
          layoutSize: 6,
          type: 'text',
        },
      ],
    },
  ];

  const validationSchema = Yup.object({
    confirmPassword: confirmPasswordValidator,
    email: emailValidator,
    firstname: usernameValidator,
    lastname: usernameValidator,
    password: passwordValidator,
    role: stringRequiredValidator,
  });

  const isSuccessful = (values: any) => {
    return { Success: values };
  };

  return (
    <div className={styles.view}>
      <Card className={styles.card}>
        <KForm
          fieldsGroups={components}
          validationSchema={validationSchema}
          onSuccess={isSuccessful}
        />
      </Card>
    </div>
  );
};

export default KFormTest;
