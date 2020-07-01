import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import UserListing from './views/UserListing';
import UserSettings from './views/UserSettings';
import UserCreation from './views/UserCreation';
import UserEdit from './views/UserEdit';

const UsersModule = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}`}>
        <UserListing />
      </Route>

      <Route path={`${match.url}/userSettings`}>
        <UserSettings />
      </Route>

      <Route exact path={`${match.url}/create`}>
        <UserCreation />
      </Route>
      <Route path={`${match.url}/edit/:userId`}>
        <UserEdit />
      </Route>
    </Switch>
  );
};

export default UsersModule;
