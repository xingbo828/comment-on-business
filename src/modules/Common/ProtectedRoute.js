import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { compose, branch, renderNothing } from 'recompose';
import isLoggedIn from './isLoggedIn';

const ProtectedRoute = ({
  component: Component,
  isLoggedIn,
  location,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? 
        <Component {...props} /> : (
        <Redirect
          to={{
            pathname: '/login',
            search: `?redirect=${location.pathname}${location.search}`
          }}
        />
      )}
  />
);

export default compose(
  withRouter,
  isLoggedIn,
  branch(
    props => props.loginStatus === 'UNINIT',
    renderNothing
  )
)(ProtectedRoute);