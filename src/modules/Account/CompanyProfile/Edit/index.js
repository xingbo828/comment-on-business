import React from 'react';
import withLayout from '../../../Common/withLayout';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { compose, withStateHandlers } from 'recompose';

import Basic from './Basic';
import PaymentMethods from './PaymentMethods';
import PhotoGallery from './PhotoGallery';
import ReviewServices from './ReviewServices';
import { getSelectedProviderProfile } from '../../accountReducer';
import { editProvider } from '../../accountAction';
import DashboardLayout from '../../../Common/Layout/DashboardLayout';
import mapImmutablePropsToPlainProps from '../../../Common/mapImmutablePropsToPlainProps';


const mapDispatchToProps = dispatch => bindActionCreators({ editProvider }, dispatch)

const EditProfile = ({ match, ...rest }) => {
  return (
    <Switch>
      <Route path={`${match.url}/basic`} render={() => <Basic {...rest}/> } />
      <Route path={`${match.url}/payment-methods`} render={() => <PaymentMethods {...rest}/> } />
      <Route path={`${match.url}/review-services`} render={() => <ReviewServices {...rest}/> } />
      <Route path={`${match.url}/photo-gallery`} render={() => <PhotoGallery {...rest}/> } />
    </Switch>
  );
};

const enhance = compose(
  connect(getSelectedProviderProfile, mapDispatchToProps),
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
  mapImmutablePropsToPlainProps,
  withLayout(DashboardLayout)
)

export default enhance(EditProfile);
