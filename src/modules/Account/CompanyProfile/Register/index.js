import { compose, withProps, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Form,
  message
} from 'antd';

import withLayout from '../../../Common/withLayout';
import isLoggedIn from '../../../Common/isLoggedIn';
import OneColumnLayout from '../../../Common/Layout/OneColumnLayout';
import Basic from '../Edit/Basic/Basic';
import { createProvider } from '../../accountAction';

const mapDispatchToProps = (dispatch, { uid }) => ({
  createProvider: (providerInfo) => dispatch(createProvider(providerInfo))
});

const enhance = compose(
  withRouter,
  withLayout(OneColumnLayout),
  isLoggedIn,
  connect(null, mapDispatchToProps),
  withStateHandlers(
    ({ initialValue = false }) => ({
      isSubmitting: initialValue,
    }),
    {
      updateIsSubmitting: () => (value) => ({
        isSubmitting: value
      })
    }
  ),
  withProps(props => ({
    isNewUser: true,
    submitForm: async (providerInfo) => {
      props.updateIsSubmitting(true)
      try {
        await props.createProvider(providerInfo);
        message.success('Company profile created');
        props.history.push({
          pathname: '/company-profile/payment-methods'
        })
      } catch(error) {
        message.error(error);
      }
      props.updateIsSubmitting(false)
    }
  })),
  Form.create()
);

export default enhance(Basic);