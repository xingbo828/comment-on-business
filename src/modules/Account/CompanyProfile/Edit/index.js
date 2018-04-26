import { connect } from 'react-redux';
import { compose, withStateHandlers, withProps } from 'recompose';
import { Form, message } from 'antd';

import withLayout from '../../../Common/withLayout';
import mapImmutablePropsToPlainProps from '../../../Common/mapImmutablePropsToPlainProps';
import DashboardLayout from '../../../Common/Layout/DashboardLayout';
import CompanyProfileForm from '../CompanyProfileForm';
import { editProvider } from '../../accountAction';

import { getSelectedProviderProfile } from '../../accountReducer';

const mapDispatchToProps = dispatch => ({
  editProvider: (providerId, providerInfo) =>
    dispatch(editProvider(providerId, providerInfo))
});

const enhance = compose(
  withLayout(DashboardLayout),
  connect(getSelectedProviderProfile, mapDispatchToProps),
  mapImmutablePropsToPlainProps,
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
    submitForm: async (providerInfo) => {
      props.updateIsSubmitting(true)
      await props.editProvider(props.selectedProviderProfile.id, providerInfo);
      props.updateIsSubmitting(false)
      message.success('Company profile updated');
    }
  })),
  Form.create({
    mapPropsToFields({ selectedProviderProfile }) {
      return {
        name: Form.createFormField({ value: selectedProviderProfile.name }),
        email: Form.createFormField({ value: selectedProviderProfile.email }),
        phoneNumber: Form.createFormField({ value: selectedProviderProfile.phoneNumber }),
        description: Form.createFormField({ value: selectedProviderProfile.description }),
        logo: Form.createFormField({ value: selectedProviderProfile.logo }),
        paymentMethods: Form.createFormField({ value: selectedProviderProfile.paymentMethods }),
        reviewInfo: Form.createFormField({ value: selectedProviderProfile.reviewInfo })
      };
    }
  })
);

export default enhance(CompanyProfileForm);
