import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import * as Yup from 'yup';

import { IJob } from '@/modules/Jobs/typings';
import { getJob, editJob } from '@/store/jobs/thunks';
import {
  sel_jobData,
  sel_edit_success,
} from '@/store/jobs/selectors';
import { KFieldGroup } from '@/components/KForm/KForm';
import KForm from '@/components/KForm';
import KBaseContainer from '@/components/KBaseContainer';
import KAlert from '@/components/KAlert';

const validationSchema = Yup.object({
  title: Yup.string().required(),
  vacants: Yup.number().required(),
});

const EditJob = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { success, message: errorMessage } = useSelector(
    sel_edit_success,
  );
  const {
    id,
    title,
    details,
    tags,
    vacants,
    status,
    salary,
    location,
  }: IJob = useSelector(sel_jobData);

  const handleSubmit = (values: any) => {
    if (id !== undefined && id !== null) {
      dispatch(
        editJob(Number(jobId), values, () => {
          history.push('/jobs');
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(getJob(Number(jobId)));
  }, [dispatch, jobId]);

  useEffect(() => {
    if (errorMessage !== '' && !success) {
      setMessage(errorMessage);
      setShowMessage(!success);
    }
  }, [errorMessage, success]);

  const components: KFieldGroup[] = [
    {
      name: 'Job information',
      fields: [
        {
          fieldProps: { label: 'Title', name: 'title' },
          initialValue: title,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Status',
            name: 'status',
            options: [
              { value: 'open', label: 'Open' },
              { value: 'closed', label: 'Closed' },
            ],
          },
          initialValue: status,
          type: 'select',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Salary', name: 'salary' },
          initialValue: salary,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Description', name: 'details' },
          initialValue: details,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Tags', name: 'tags' },
          initialValue: tags,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Vacants', name: 'vacants' },
          initialValue: vacants,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Location', name: 'location' },
          initialValue: location,
          type: 'text',
          layoutSize: 6,
        },
      ],
    },
  ];
  return (
    <KBaseContainer>
      <div className="view-edit-job">
        <h1>Edit job</h1>
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
        {id !== Number(jobId) ? (
          <p>...loading</p>
        ) : (
          <KForm
            fieldsGroups={components}
            validationSchema={validationSchema}
            onSuccess={handleSubmit}
            buttonText="Update"
          />
        )}
      </div>
    </KBaseContainer>
  );
};

export default EditJob;
