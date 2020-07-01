import React from 'react';

import { Switch, Route, useRouteMatch } from 'react-router-dom';

import JobListing from './views/JobListing';
import SingleJob from './views/SingleJob';
import CreateJob from './views/CreateJob';
import EditJob from './views/EditJob';

const JobsModule = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`}>
        <JobListing />
      </Route>

      <Route exact path={`${match.url}/create`}>
        <CreateJob />
      </Route>

      <Route path={`${match.url}/edit/:jobId`}>
        <EditJob />
      </Route>

      <Route path={`${match.url}/:jobId`}>
        <SingleJob />
      </Route>
    </Switch>
  );
};

export default JobsModule;
