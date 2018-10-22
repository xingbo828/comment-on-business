import React from 'react';
import { connect } from 'react-redux';
import { message, Spin } from 'antd';
import { withRouter , Redirect } from 'react-router-dom';
import withLayout from '../../Common/withLayout';
import OneColumnPreAuthLayout from '../../Common/Layout/OneColumnPreAuthLayout';
import { compose, withStateHandlers, withProps, branch, renderComponent } from 'recompose';
import * as firebase from 'firebase';
import Login from './Login';
import { auth as firebaseAuth } from '../../../firebaseClient';
import { getAccount } from '../accountReducer';

const Spinner = () => <Spin delay={500} size="large" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}} />

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
  withStateHandlers(
    ({ initialValue = false }) => ({
      isSubmitting: initialValue,
    }),
    {
      updateIsSubmitting: ({ isSubmitting }) => (value) => ({
        isSubmitting: value
      })
    }
  ),
  withProps(props => ({
    facebookLogin,
    googleLogin,
    register: async ({ email, password }) => {
      props.updateIsSubmitting(true);
      try {
        const user = await firebaseAuth.createUserWithEmailAndPassword(email, password);
        if(!user.emailVerified) {
          message.info(`A verification link has been sent to your email account at ${user.email}`, 10);
        }
        await user.sendEmailVerification();
      } catch(error) {
        console.error(error)
        message.error(error.message, 10);
      }
      props.updateIsSubmitting(false)
    },
    login: async ({ email, password }) => {
      props.updateIsSubmitting(true);
      try {
        const user = await firebaseAuth.signInWithEmailAndPassword(email, password);
        if(!user.emailVerified) {
          message.info(`A verification link has been sent to your email account at ${user.email}`, 10);
        }
      } catch(error) {
        console.error(error)
        message.error(error.message, 10);
      }
      props.updateIsSubmitting(false)
    }
  })),
  branch(
    props => props.account.get('status') === 'UNINIT',
    renderComponent(Spinner)
  ),
  branch(
    props => props.account.get('status') === 'AUTHENTICATED',
    renderComponent(() => <Redirect to="/" />)
  ),
  withLayout(OneColumnPreAuthLayout)
);

export default enhance(Login);