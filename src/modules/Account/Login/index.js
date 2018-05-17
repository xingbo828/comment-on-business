import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { withRouter , Redirect } from 'react-router-dom';
import { compose, withStateHandlers, withProps, branch, renderNothing, renderComponent, lifecycle } from 'recompose';
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
    authButNotEmailVerified: props.account.get('status') === 'AUTHENTICATED' && !props.account.getIn(['user', 'emailVerified']),
    facebookLogin,
    googleLogin,
    register: async ({ email, password }) => {
      props.updateIsSubmitting(true);
      try {
        const user = await firebaseAuth.createUserWithEmailAndPassword(email, password);
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
        await firebaseAuth.signInWithEmailAndPassword(email, password);
      } catch(error) {
        console.error(error)
        message.error(error.message, 10);
      }
      props.updateIsSubmitting(false)
    }
  })),
  branch(
    props => props.account.get('status') === 'UNINIT',
    renderNothing
  ),
  branch(
    props => props.account.get('status') === 'AUTHENTICATED' && props.account.getIn(['user', 'emailVerified']),
    renderComponent(() => <Redirect to="/" />)
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if(nextProps.authButNotEmailVerified) {
        message.info('Thank you for registering with us. We have sent a account verification email to you.', 0);
      }
    },
    componentDidMount() {
      if(this.props.authButNotEmailVerified) {
        message.info('Thank you for registering with us. We have sent a account verification email to you.', 0);
      }
    }
  })
);

export default enhance(Login);