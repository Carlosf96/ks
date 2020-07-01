import React from 'react';
import {
  useRouteMatch,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from '@/modules/Auth/views/Login';
import Signup from '@/modules/Auth/views/Signup';
import ResetPassword from './views/ResetPassword';

const AuthModule = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/login`}>
        <Login />
      </Route>
      <Route exact path={`${match.url}/signup`}>
        <Signup />
      </Route>
      <Route exact path={`${match.url}/reset-password`}>
        <ResetPassword />
      </Route>
      <Redirect to={`${match.url}/login`} />
    </Switch>
  );
};

export default AuthModule;
