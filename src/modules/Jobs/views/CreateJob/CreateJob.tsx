import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import * as Yup from 'yup';

import { addNewJob } from '@/store/jobs/thunks';
import { selectorJobsFail } from '@/store/jobs/selectors';
import { KFieldGroup } from '@/components/KForm/KForm';
import KForm from '@/components/KForm';
import KBaseContainer from '@/components/KBaseContainer';
import KAlert from '@/components/KAlert';
import { useHistory } from 'react-router-dom';

const components: KFieldGroup[] = [
  {
    name: 'Job information',
    fields: [
      {
        fieldProps: { label: 'Title', name: 'title' },
        initialValue: '',
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
        initialValue: 'open',
        type: 'select',
        layoutSize: 6,
      },
      {
        fieldProps: { label: 'Salary', name: 'salary' },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: { label: 'Description', name: 'details' },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: { label: 'Tags', name: 'tags' },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: { label: 'Vacants', name: 'vacants' },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
      {
        fieldProps: { label: 'Location', name: 'location' },
        initialValue: '',
        type: 'text',
        layoutSize: 6,
      },
    ],
  },
];

const validationSchema = Yup.object({
  title: Yup.string().required(),
  vacants: Yup.number().required(),
});

const CreateJob = () => {
  const history = useHistory();
  const fail = useSelector(selectorJobsFail);
  const [showMessage, setShowMessage] = useState<boolean>(fail.error);
  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    dispatch(addNewJob(values));
    history.push('/jobs');
  };

  useEffect(() => {
    setShowMessage(fail.error);
  }, [fail]);
  return (
    <KBaseContainer>
      <div className="view-create-job">
        <Snackbar
          autoHideDuration={3000}
          open={showMessage}
          onClose={() => setShowMessage(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <KAlert severity="error">Could not create Job ! :(</KAlert>
        </Snackbar>
        <h1>Create job</h1>
        <KForm
          fieldsGroups={components}
          validationSchema={validationSchema}
          onSuccess={handleSubmit}
          buttonText="Create"
        />
      </div>
    </KBaseContainer>
  );
};

export default CreateJob;
