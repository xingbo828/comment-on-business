import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Form
} from 'antd';

import withLayout from '../../Common/withLayout';
import isLoggedIn from '../../Common/isLoggedIn';
import OneColumnLayout from '../../Common/Layout/OneColumnLayout';
import Register from './Register';
import { createProvider } from '../accountAction';

const mapDispatchToProps = (dispatch, { uid }) => ({
  createProvider: (providerInfo) => dispatch(createProvider(providerInfo))
});

const enhance = compose(
  withRouter,
  withLayout(OneColumnLayout),
  isLoggedIn,
  connect(null, mapDispatchToProps),
  Form.create()
);

export default enhance(Register);