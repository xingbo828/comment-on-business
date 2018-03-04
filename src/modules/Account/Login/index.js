import React from 'react';
import { connect } from 'react-redux';
import { withRouter , Redirect } from 'react-router-dom';
import { compose, withProps, branch, renderNothing, renderComponent } from 'recompose';
import * as firebase from 'firebase';
import Login from './Login';
import { auth as firebaseAuth } from '../../../firebaseClient';
import { getAccount } from '../accountReducer';

const facebookLogin = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  provider.addScope('email');
  firebaseAuth.signInWithRedirect(provider);
};

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  firebaseAuth.signInWithRedirect(provider);
};

const mapStateToProps = state => getAccount(state);


const enhance = compose(
  withRouter,
  connect(mapStateToProps),
  withProps(props => ({
    facebookLogin,
    googleLogin
  })),
  branch(
    props => props.account.get('status') === 'UNINIT',
    renderNothing
  ),
  branch(
    props => props.account.get('status') === 'AUTHENTICATED',
    renderComponent(() => <Redirect to="/" />)
  )
);

export default enhance(Login);