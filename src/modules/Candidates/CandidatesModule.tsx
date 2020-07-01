import React, { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import SingleCandidateView from './views/SingleCandidateView';
import AddCandidate from '@/modules/Candidates/views/AddCandidate';
import CandidateListing from './views/CandidateListing';
import AddFeedback from './views/AddFeedback';
import EditCandidate from './views/EditCandidate';

const CandidatesModule: FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`}>
        <CandidateListing />
      </Route>

      <Route exact path={`${match.url}/create`}>
        <AddCandidate />
      </Route>

      <Route path={`${match.url}/edit/:candidateId`}>
        <EditCandidate />
      </Route>

      <Route exact path={`${match.url}/:candidateId/add-feedback`}>
        <AddFeedback />
      </Route>

      <Route path={`${match.url}/:candidateId`}>
        <SingleCandidateView />
      </Route>

      <Route path={`${match.url}/documents`}>
        <p>Document view</p>
      </Route>
    </Switch>
  );
};

export default CandidatesModule;
