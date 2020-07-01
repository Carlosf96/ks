import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import * as Yup from 'yup';

import { addNewCandidate } from '@/store/candidates/thunks';
import { sel_candidatesFail } from '@/store/candidates/selectors';
import { KFieldGroup, KField } from '@/components/KForm/KForm';
import KBaseContainer from '@/components/KBaseContainer';
import KForm from '@/components/KForm';
import KAlert from '@/components/KAlert';
import { useHistory } from 'react-router-dom';
import jobService from '@/services/jobs.service';
import { IJob } from '@/modules/Jobs/typings';

const validationSchema = Yup.object({
  phone: Yup.number()
    .required()
    .min(8),
  email: Yup.string()
    .email()
    .required(),
});

const AddCandidate = () => {
  const initialComponents: KFieldGroup[] = [
    {
      name: 'Candidate information',
      fields: [
        {
          fieldProps: { label: 'First Name', name: 'firstName' },
          initialValue: '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Last Name', name: 'lastName' },
          initialValue: '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Phone', name: 'phone' },
          initialValue: '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Email', name: 'email' },
          initialValue: '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Website', name: 'website' },
          initialValue: '',
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: {
            label: 'Stage',
            options: [
              { value: 1, label: 'PROSPECTIVE' },
              { value: 2, label: 'ACTIVE' },
              { value: 3, label: 'HIRED' },
              { value: 4, label: 'REJECTED' },
            ],
            name: 'stageId',
          },
          initialValue: 1,
          type: 'select',
          layoutSize: 6,
        },
      ],
    },
  ];
  const history = useHistory();
  const fail = useSelector(sel_candidatesFail);
  const [showMessage, setShowMessage] = useState<boolean>(fail.error);
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [components, setComponents] = useState<KFieldGroup[]>([]);

  useEffect(() => {
    jobService.getAll().then(res => {
      setJobs(res);
    });

    return function cleanup() {
      setJobs([]);
    };
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      const updatedComponents = initialComponents;
      const jobsOptions = jobs.map(job => {
        return {
          value: job.id,
          label: job.title,
        };
      });

      const jobsField: KField = {
        fieldProps: {
          label: 'Position',
          options: jobsOptions,
          name: 'jobId',
        },
        initialValue: jobsOptions[0].value,
        type: 'select',
        layoutSize: 6,
      };

      updatedComponents[0].fields.push(jobsField);
      setComponents(updatedComponents);

      return () => {
        setJobs([]);
        setComponents([]);
      };
    }
  }, [jobs]);

  const handleSubmit = (values: any) => {
    values.recruiter = 'Alfredo Broggi';
    values.employer = 'Ksquare';

    if (values.stageId && values.jobId) {
      dispatch(
        addNewCandidate(values, () => {
          history.push('/candidates');
        }),
      );
    }
  };

  useEffect(() => {
    setShowMessage(fail.error);
  }, [fail]);

  return (
    <KBaseContainer>
      <div className="view-add-candidate">
        <Snackbar
          autoHideDuration={3000}
          open={showMessage}
          onClose={() => setShowMessage(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <KAlert severity="error">
            Could not create Candidate ! :(
          </KAlert>
        </Snackbar>
        <h1>Create Candidate</h1>
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

export default AddCandidate;
