import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Snackbar, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import KBaseContainer from '@/components/KBaseContainer';
import KAlert from '@/components/KAlert';
import KTable from '@/components/KTable';
import KModal from '@/components/KModal';
import KButton from '@/components/KButton';
import {
  sel_jobsData,
  sel_jobsLoading,
} from '@/store/jobs/selectors';
import { deleteJob, getJobs } from '@/store/jobs/thunks';
import { IJobListing } from '@/modules/Jobs/typings';
import Filters from '@/modules/Jobs/views/SingleJob/components/Filters';
import styles from '@/modules/Jobs/views/JobListing/JobListing.module.scss';

export interface IHeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  options?: string;
  sortable?: boolean;
}

const headCells: IHeadCell[] = [
  {
    disablePadding: false,
    id: 'title',
    label: 'Title',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'location',
    label: 'Location',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'salary',
    label: 'Salary',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'vacants',
    label: 'Vacants',
    numeric: true,
  },
  {
    disablePadding: false,
    id: 'tags',
    label: 'Tags',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'status',
    label: 'Status',
    numeric: false,
  },
  {
    disablePadding: false,
    id: 'options',
    label: 'Options',
    numeric: false,
  },
];
interface IFilter {
  label: string;
  name: string;
  total: number;
}
const jobFilters: IFilter[] = [
  {
    label: 'All',
    name: 'all',
    total: 0,
  },
  {
    label: 'Open',
    name: 'open',
    total: 0,
  },
  {
    label: 'Closed',
    name: 'closed',
    total: 0,
  },
];

const updateFiltersTotals = (
  filtersList: IFilter[],
  jobsList: IJobListing[],
) => {
  const updatedFiltersList = filtersList.map((filter: IFilter) => {
    if (filter.name === 'all') {
      return {
        ...filter,
        total: jobsList.length,
      };
    }
    return {
      ...filter,
      total: jobsList.filter(
        (job: IJobListing) => job.status === filter.name,
      ).length,
    };
  });

  return updatedFiltersList;
};

const JobListing: FC = () => {
  const [currentId, setCurrentId] = useState(0);
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const dispatch = useDispatch();
  const jobs: IJobListing[] = useSelector(sel_jobsData);
  const loading = useSelector(sel_jobsLoading);
  const filters = updateFiltersTotals(jobFilters, jobs);

  const handleDeleteMessage = () => {
    setShowMessage(true);
  };

  const handleDelete = () => {
    dispatch(deleteJob(currentId));
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
    view: '/jobs/',
    delete: (id: number) => {
      handleOpen(id);
    },
    edit: '/jobs/edit/',
  };

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  return (
    <KBaseContainer whole>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showMessage}
      >
        <KAlert severity="success">Job deleted.</KAlert>
      </Snackbar>
      <KModal
        aria-describedby="simple-modal-description"
        aria-labelledby="simple-modal-title"
        onClose={handleClose}
        open={open}
      >
        <div>
          <Typography variant="h6" align="center">
            Are you sure you want to delete this job?
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
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        className={styles.titleRow}
      >
        <Typography variant="h1">Jobs</Typography>
        <div>
          <Link to="/jobs/create">
            <KButton>Add Job</KButton>
          </Link>
        </div>
      </Box>
      <Grid container>
        <Grid item xs={12} md={2}>
          <Filters
            activeFilter={filter}
            filters={filters}
            changeFilter={filterName => setFilter(filterName)}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <div className={styles.tableContainer}>
            <KTable
              data={
                filter === 'all'
                  ? jobs
                  : jobs.filter(
                      (job: IJobListing) => job.status === filter,
                    )
              }
              headCells={headCells}
              options={options}
              isLoading={loading}
            />
          </div>
        </Grid>
      </Grid>
    </KBaseContainer>
  );
};

export default JobListing;
