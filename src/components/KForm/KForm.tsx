/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Grid, Typography, Card } from '@material-ui/core';
import { GridSize, GridSpacing } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { BaseTextFieldProps } from '@material-ui/core/TextField';
import { Formik, FormikProps, FormikValues, Form } from 'formik';
import { flatten, fromPairs, map, pipe, pluck } from 'rambdax';
import React from 'react';
import KSelect from '@/components/KSelect';
import KInput from '@/components/KInput';
import KRadioButton from '@/components/KRadioButton';
import KCheckbox from '@/components/KCheckbox';
import KSwitch from '@/components/KSwitch';
import styles from './KFormTest.module.scss';
import KButton from '../KButton';

const fieldMapping = {
  checkbox: KCheckbox,
  radioButton: KRadioButton,
  select: KSelect,
  switch: KSwitch,
  text: KInput,
};

export interface KField {
  fieldProps: BaseTextFieldProps | any;
  initialValue: any;
  layoutSize?: GridSize | { [key in Breakpoint]?: GridSize };
  type?: keyof typeof fieldMapping;
}

export interface KFieldGroup {
  fields: KField[];
  name: string;
  spacing?: GridSpacing;
}

type EnhancedKFieldGroup = KFieldGroup & FormikProps<any>;
export interface KFormProps {
  fieldsGroups: KFieldGroup[];
  validationSchema?: any;
  onSuccess: (values: FormikValues) => void;
  buttonText?: string;
}

const FieldGroup: React.FC<EnhancedKFieldGroup> = props => {
  const {
    errors,
    fields,
    name,
    spacing,
    touched,
    values,
    handleBlur,
    handleChange,
  } = props;
  return (
    <div>
      <Typography variant="h5">{name}</Typography>
      <Grid container spacing={spacing ?? 3}>
        {fields.map((field, index) => {
          const CurrentField = field.type
            ? fieldMapping[field.type]
            : fieldMapping.text;
          const layout: any =
            typeof field.layoutSize === 'number' || !field.layoutSize
              ? { xs: 12, md: field.layoutSize ?? 12 }
              : field.layoutSize;
          return (
            <Grid item {...layout} key={index}>
              <CurrentField
                {...field.fieldProps}
                error={
                  errors[field.fieldProps.name] &&
                  touched[field.fieldProps.name]
                }
                fullWidth
                helperText={
                  touched[field.fieldProps.name] &&
                  errors[field.fieldProps.name]
                }
                value={values[field.fieldProps.name] || ''}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const KForm: React.FC<KFormProps> = props => {
  const {
    fieldsGroups,
    validationSchema,
    onSuccess,
    buttonText,
  } = props;
  const initialValues = pipe(
    () => fieldsGroups,
    pluck('fields') as any,
    flatten as any,
    map((item: KField) => [
      item.fieldProps?.name || '',
      item && item.initialValue,
    ]) as any,
    fromPairs,
  )();
  return (
    <Card className={styles.card}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSuccess}
      >
        {_innerProps => {
          return (
            <Form>
              {fieldsGroups.map((group, index) => (
                <FieldGroup
                  key={index}
                  {...group}
                  {..._innerProps}
                ></FieldGroup>
              ))}
              <KButton type="submit" className={styles.submitButton}>
                {buttonText}
              </KButton>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default KForm;
