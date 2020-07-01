import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import * as Yup from 'yup';

import {
  getOneCandidate,
  editOneCandidate,
} from '@/store/candidates/thunks';
import {
  sel_candidateData,
  sel_edit_success,
} from '@/store/candidates/selectors';
import { ICandidateNew } from '@/modules/Candidates/typings';
import { KFieldGroup } from '@/components/KForm/KForm';
import KBaseContainer from '@/components/KBaseContainer';
import KForm from '@/components/KForm';
import KAlert from '@/components/KAlert';

const validationSchema = Yup.object({
  firstName: Yup.string().required(),
});

const EditCandidate = () => {
  const history = useHistory();
  const { candidateId } = useParams();
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { success, message: errorMessage } = useSelector(
    sel_edit_success,
  );
  const {
    id,
    firstName,
    lastName,
    phone,
    email,
    website,
    stage,
  }: ICandidateNew = useSelector(sel_candidateData);

  const handleSubmit = (values: any) => {
    if (id !== undefined && id !== null) {
      dispatch(
        editOneCandidate(id, values, () => {
          history.push('/candidates');
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(getOneCandidate(Number(candidateId)));
  }, [dispatch, candidateId]);

  useEffect(() => {
    if (errorMessage !== '' && !success) {
      setMessage(errorMessage);
      setShowMessage(!success);
    }
  }, [errorMessage, success]);

  const components: KFieldGroup[] = [
    {
      name: 'Candidates information',
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
          fieldProps: { label: 'Phone', name: 'phone' },
          initialValue: phone,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Email', name: 'email' },
          initialValue: email,
          type: 'text',
          layoutSize: 6,
        },
        {
          fieldProps: { label: 'Website', name: 'website' },
          initialValue: website,
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
          initialValue: stage.id,
          type: 'select',
          layoutSize: 6,
        },
      ],
    },
  ];
  return (
    <KBaseContainer>
      <h1>Edit Candidate</h1>
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
      {id !== Number(candidateId) ? (
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

export default EditCandidate;
