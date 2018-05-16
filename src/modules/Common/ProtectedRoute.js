import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { compose, branch, renderNothing } from 'recompose';
import isLoggedIn from './isLoggedIn';
import {
  message
} from 'antd';
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
        renderLoggedInView(props, rest)(Component) : (
        <Redirect
          to={{
            pathname: '/login',
            search: `?redirect=${location.pathname}${location.search}`
          }}
        />
      )}
  />
);

const renderLoggedInView = (props, { user, history }) => (Component) => {
  if (history.location.pathname !== '/register' && (!user.providers || Object.keys(user.providers).length === 0)) {
    message.info('Doesn\'t seem like you have a company registered. Let\'s get started', 5);
    return (<Redirect
      to={{
        pathname: '/register',
      }}
    />)
  }
  return <Component {...props} />;
}

export default compose(
  withRouter,
  isLoggedIn,
  branch(
    props => props.loginStatus === 'UNINIT',
    renderNothing
  )
)(ProtectedRoute);