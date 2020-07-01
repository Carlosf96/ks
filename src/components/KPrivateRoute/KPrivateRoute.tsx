import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, getRole } from '@/utils/helpers/index';

const KPrivateRoute = ({ children, roles, ...rest }: any) => {
  return roles !== undefined && roles.length ? (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() && roles.includes(getRole()) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default KPrivateRoute;
