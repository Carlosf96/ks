import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Snackbar, Typography } from '@material-ui/core';
import KAlert from '@/components/KAlert';
import KBaseContainer from '@/components/KBaseContainer';
import KButton from '@/components/KButton';
import KModal from '@/components/KModal';
import KTable from '@/components/KTable';
import { ICandidateListing } from '@/modules/Candidates/typings';
import {
  deleteCandidate,
  getCandidates,
} from '@/store/candidates/thunks';
import {
  sel_candidatesData,
  sel_candidatesLoading,
} from '@/store/candidates/selectors';
import { format } from 'date-fns';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  options?: string;
  sortable?: boolean;
}

const headCells: HeadCell[] = [
  {
    disablePadding: true,
    id: 'name',
    label: 'Candidate',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'position',
    label: 'Position',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'recruiter',
    label: 'Recruiter',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'created',
    label: 'Created',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'stage',
    label: 'Stage',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'options',
    label: 'Options',
    numeric: false,
  },
];

interface ICandidateShow {
  name: string;
  position: string;
  recruiter: string;
  created: string;
  stage: string;
}

const CandidateListing: FC = () => {
  const [currentId, setCurrentId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const dispatch = useDispatch();
  const [updatedCandidates, setUpdatedCandidates] = useState<
    ICandidateShow[]
  >([]);
  const loading = useSelector(sel_candidatesLoading);
  const candidates: ICandidateListing[] = useSelector(
    sel_candidatesData,
  );

  const handleDeleteMessage = () => {
    setShowMessage(true);
  };

  const handleDelete = () => {
    dispatch(deleteCandidate(currentId));
    handleDeleteMessage();
    setOpen(false);
  };

  const handleOpen = (id: number) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentId(0);
    setOpen(false);
    setShowMessage(false);
  };

  const options = {
    view: '/candidates/',
    delete: (id: number) => {
      handleOpen(id);
    },
    edit: '/candidates/edit/',
  };

  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  useEffect(() => {
    if (candidates.length > 0) {
      const updated = candidates.map(
        (candidate: ICandidateListing) => {
          return {
            id: candidate.id,
            name: `${candidate.firstName} ${candidate.lastName}`,
            position: candidate.jobs[0]
              ? candidate.jobs[0].title
              : '',
            recruiter: candidate.recruiter,
            created: format(
              new Date(candidate.createdAt),
              'dd/MM/yy',
            ),
            stage: candidate.stage.name,
          };
        },
      );

      setUpdatedCandidates(updated);
    }
  }, [candidates]);

  return (
    <KBaseContainer whole>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showMessage}
      >
        <KAlert severity="success">Candidate deleted.</KAlert>
      </Snackbar>
      <KModal
        aria-describedby="simple-modal-description"
        aria-labelledby="simple-modal-title"
        onClose={handleClose}
        open={open}
      >
        <div>
          <Typography variant="h6" align="center">
            Are you sure you want to delete this candidate?
          </Typography>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="space-evenly"
            m={2}
          >
            <KButton onClick={handleDelete}>YES</KButton>
            <KButton onClick={handleClose}>NO</KButton>
          </Box>
        </div>
      </KModal>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h1">Candidates</Typography>
        <div>
          <Link to="/candidates/create">
            <KButton>Add Candidate</KButton>
          </Link>
        </div>
      </Box>
      <KTable
        data={updatedCandidates}
        headCells={headCells}
        isLoading={loading}
        options={options}
      />
    </KBaseContainer>
  );
};
export default CandidateListing;
