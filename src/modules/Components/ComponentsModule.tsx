import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ComponentsList from './views/ComponentsList';

const ComponentsModule = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`}>
        <ComponentsList />
      </Route>
    </Switch>
  );
};

export default ComponentsModule;
