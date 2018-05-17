import { compose, withProps, withStateHandlers } from 'recompose';
import {
  Form,
  message
} from 'antd';
import { withRouter } from 'react-router-dom';

import withLayout from '../../Common/withLayout';
import OneColumnPreAuthLayout from '../../Common/Layout/OneColumnPreAuthLayout';

import { auth as firebaseAuth } from '../../../firebaseClient';
import ResetPassword from './ResetPassword';

const enhance = compose(
  withRouter,
  withLayout(OneColumnPreAuthLayout),
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
    submitForm: async ({ email }) => {
      console.log(props)
      props.updateIsSubmitting(true)
      try {
        await firebaseAuth.sendPasswordResetEmail(email);
        message.success('An email with link to reset your password has been sent to you.', 10);
      } catch(error) {
        message.error(error.message, 0)
      }
      props.updateIsSubmitting(false)
    }
  })),
  Form.create()
);

export default enhance(ResetPassword);
