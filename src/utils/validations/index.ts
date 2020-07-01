import * as Yup from 'yup';

const PASSWORD_MIN_LENGTH = 6;
const USERNAME_MIN_LENGTH = 4;
const EMAIL_MESSAGE = 'Invalid email';
const PASSWORD_CONFIRMATION_MESSAGE = 'Password must match';

export const stringRequiredValidator = Yup.string().required();

export const usernameValidator = Yup.string()
  .required()
  .min(USERNAME_MIN_LENGTH);

export const passwordValidator = Yup.string()
  .required()
  .min(PASSWORD_MIN_LENGTH);

export const emailValidator = Yup.string()
  .required()
  .email(EMAIL_MESSAGE);

export const confirmPasswordValidator = Yup.string()
  .required()
  .oneOf([Yup.ref('password'), null], PASSWORD_CONFIRMATION_MESSAGE);
