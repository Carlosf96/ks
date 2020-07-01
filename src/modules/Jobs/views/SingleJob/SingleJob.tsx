import React, { FC, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Snackbar, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Filters from './components/Filters';
import HiringProcess from './components/HiringProcess';
import HiringTeam from './components/HiringTeam';
import InternalNotes from './components/InternalNotes';
import JobDetails from './components/JobDetails';
import JobHeroHeader from './components/JobHeroHeader';
import KAlert from '@/components/KAlert';
import KButton from '@/components/KButton';
import KModal from '@/components/KModal';
import KTable from '@/components/KTable';
import { useDispatch, useSelector } from 'react-redux';
import { getJob } from '@/store/jobs/thunks';
import { sel_jobData } from '@/store/jobs/selectors';
import { IJobRead, ICandidate } from '@/modules/Jobs/typings';

import styles from './SingleJob.module.scss';

import {
  hiringProcess,
  internalNotes,
  managers,
  recruiters,
  interviewers,
} from './dummyData.json';
import { tabsLabels, filtersData } from './constants';
import { deleteCandidate } from '@/store/candidates/thunks';

//TODO: ICandidate needs to be deleted from the whole app before production.
// import { ICandidate } from '@/modules/Candidates/typings';

interface IFilter {
  label: string;
  name: string;
  total: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  sortable?: boolean;
  options?: string;
}

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Candidate',
  },
  {
    id: 'recruiter',
    numeric: false,
    disablePadding: false,
    label: 'Recruiter',
  },
  // {
  //   id: 'employer',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Employer',
  // },
  {
    id: 'created',
    numeric: false,
    disablePadding: false,
    label: 'Created',
  },
  {
    id: 'stage',
    numeric: false,
    disablePadding: false,
    label: 'Stage',
  },
  {
    id: 'options',
    numeric: false,
    disablePadding: false,
    label: ' ',
  },
];

const updateFiltersTotals = (
  filtersList: Array<IFilter>,
  candidatesList: Array<any>,
) => {
  const updatedFiltersList = filtersList.map((filter: IFilter) => {
    if (filter.name === 'All') {
      return {
        ...filter,
        total: candidatesList.length,
      };
    }
    return {
      ...filter,
      total: candidatesList.filter(
        candidate => candidate.stage === filter.name,
      ).length,
    };
  });

  return updatedFiltersList;
};

const SingleJob: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const parsedId = Number(jobId);

  useEffect(() => {
    dispatch(getJob(parsedId));
  }, [dispatch, parsedId]);

  const currentJob: IJobRead = useSelector(sel_jobData);
  const candidates = currentJob.candidates.map(
    (candidate: ICandidate) => {
      return {
        id: candidate.id,
        name: `${candidate.firstName} ${candidate.lastName}`,
        recruiter: candidate.recruiter,
        created: candidate.stage.createdAt,
        stage: candidate.stage.name,
      };
    },
  );

  const [currentId, setCurrentId] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);

  const handleDeleteMessage = () => {
    setShowMessage(true);
  };

  const handleDelete = () => {
    dispatch(deleteCandidate(currentId));
    handleDeleteMessage();
    setOpen(false);
  };

  const handleOpen = (id: number) => {
    setOpen(true);
    setCurrentId(id);
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

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newActiveTab: number,
  ) => {
    setActiveTab(newActiveTab);
  };

  const filters = updateFiltersTotals(filtersData, candidates);

  const [activeFilter, setActiveFilter] = useState(filters[0]);

  const handleChangeFilter = (filterName: string) => {
    const newActiveFilter = filters.filter(
      fltr => fltr.name === filterName,
    );
    setActiveFilter(newActiveFilter[0]);
  };

  const jobHeaderData = {
    position: currentJob.title,
    location: currentJob.location,
    status: currentJob.status,
  };

  const detailsData = {
    id: currentJob.id,
    title: currentJob.title,
    location: currentJob.location,
    department: currentJob.department,
    salary: currentJob.salary,
    jobCreator: currentJob.jobCreator,
    // aplicationForm: jobDetails.aplicationForm,
    // jobType: jobDetails.jobType,
    jobTime: currentJob.jobTime,
    // groupHiringFor: jobDetails.additionalDetails.groupHiringFor,
    // practiceDepartment:
    //   jobDetails.additionalDetails.practiceDepartment,
    // priority: jobDetails.additionalDetails.priority,
  };

  return (
    <Grid container>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        open={showMessage}
      >
        <KAlert severity="success">Candidate deleted.</KAlert>
      </Snackbar>
      <KModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
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
      <Grid item xs={12}>
        <JobHeroHeader
          jobData={jobHeaderData}
          activeTab={activeTab}
          changeTab={handleChange}
          tabs={tabsLabels}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container className={styles.mainContainer}>
          {activeTab === 0 ? (
            <Fragment>
              <Grid item xs={12} md={2}>
                <Filters
                  activeFilter={activeFilter.name}
                  changeFilter={handleChangeFilter}
                  filters={filters}
                />
              </Grid>
              <Grid item xs={12} md={10}>
                <div className={styles.tableContainer}>
                  <KTable
                    data={
                      activeFilter.name === 'All'
                        ? candidates
                        : candidates.filter(
                            (candidate: any) =>
                              candidate.stage === activeFilter.name,
                          )
                    }
                    headCells={headCells}
                    options={options}
                  />
                </div>
              </Grid>
            </Fragment>
          ) : (
            <Fragment>
              <Grid item xs={12} md={7}>
                <JobDetails details={detailsData} />
                <HiringProcess template={hiringProcess.template} />
                <InternalNotes notes={internalNotes} />
              </Grid>
              <Grid item xs={false} md={1}></Grid>
              <Grid item xs={12} md={4}>
                <HiringTeam
                  interviewers={interviewers}
                  managers={managers}
                  recruiters={recruiters}
                />
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleJob;
