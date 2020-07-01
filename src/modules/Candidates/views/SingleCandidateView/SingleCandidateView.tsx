import * as React from 'react';
import { useState, useEffect, FC, ChangeEvent } from 'react';
import {
  useRouteMatch,
  useParams,
  Switch,
  Route,
} from 'react-router-dom';
import { Grid } from '@material-ui/core';
// import Description from '@/modules/Candidates/Components/Description';
// import CandidateInfo from '@/modules/Candidates/Components/CandidateInfo';
import Feedback from '@/modules/Candidates/views/Feedback';
import {
  // ICandidate,
  ICandidateRead,
} from '@/modules/Candidates/typings';
import CandidateHeroHeader from '@/modules/Candidates/views/SingleCandidateView/partials/CandidateHeroHeader';
import { getOneCandidate } from '@/store/candidates/thunks';
import { useDispatch, useSelector } from 'react-redux';

import styles from './SingleCandidateView.module.scss';
import { sel_candidateData } from '@/store/candidates/selectors';

export interface ITab {
  tab: string;
  to: string;
}

const SingleCandidateView: FC = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [tabIndex, setTabIndex] = useState(0);
  const tabs: ITab[] = [
    { tab: 'feedback', to: `${match.url}/feedback` },
    // { tab: 'description', to: `${match.url}` },
    // { tab: 'resume', to: `${match.url}/resume` },
  ];

  // const dummyCandidate: ICandidate = {
  //   id: 1,
  //   firstName: 'TestFN',
  //   lastName: 'TestLN',
  //   jobTitle: 'JS dev',
  //   status: 'open',
  //   stage: 'active',
  //   email: 'email@mail.com',
  //   phone: '9999999999',
  //   website: 'test.com',
  //   positions: ['JS dev'],
  //   recruiters: [{ name: 'Alfredo Brogi', role: 'recriter' }],
  //   created: new Date('Sun, 20 Jan 2019 17:39:24 GMT'),
  //   employer: 'KSquare',
  // };

  const { candidateId } = useParams();
  const parsedId = Number(candidateId);

  const handleChange = (
    event: ChangeEvent<{}>,
    newActiveTab: number,
  ) => {
    setTabIndex(newActiveTab);
  };

  useEffect(() => {
    dispatch(getOneCandidate(parsedId));
  }, [dispatch, parsedId]);

  const candidate: ICandidateRead = useSelector(sel_candidateData);

  const candidateHeaderData = {
    name: `${candidate.firstName} ${candidate.lastName}`,
    status: candidate.jobs[0].status,
    position: candidate.jobs[0].title,
  };

  return (
    <Grid container direction="column" className={styles.container}>
      <Grid
        container
        item
        direction="column"
        className={styles.header}
      >
        <CandidateHeroHeader
          candidateData={candidateHeaderData}
          activeTab={tabIndex}
          changeTab={handleChange}
          tabs={tabs}
        />
      </Grid>
      <Grid item className={styles.components} xs={12} md={8}>
        <Switch>
          {/* <Route exact path={`${match.url}`}>
            <Description candidateData={dummyCandidate} />
          </Route> */}
          <Route path={`${match.url}/`}>
            <Feedback
              feedbacks={candidate.feedbacks}
              candidateId={parsedId}
            />
          </Route>
          {/* <Route path={`${match.url}/resume`}>
            <h1>Resume</h1>
          </Route> */}
        </Switch>
      </Grid>
      {/* <Grid className={styles.info} item xs={12} md={4}>
        <CandidateInfo candidateInfo={dummyCandidate} />
      </Grid> */}
    </Grid>
  );
};

export default SingleCandidateView;
