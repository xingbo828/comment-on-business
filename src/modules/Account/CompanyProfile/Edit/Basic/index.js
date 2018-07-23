import { compose, withProps } from 'recompose';
import { Form, message } from 'antd';

import Basic from './Basic';

const enhance = compose(
  withProps(props => ({
    submitForm: async (providerInfo) => {
      props.updateIsSubmitting(true)
      try {
        await props.editProvider(Object.assign({ type: 'basic', providerId: props.selectedProviderProfile.id }, providerInfo));
        message.success('Update Successful');
      } catch(error) {
        message.error(error);
      }
      props.updateIsSubmitting(false)
      
    }
  })),
  Form.create({
    mapPropsToFields({ selectedProviderProfile }) {
      return {
        name: Form.createFormField({ value: selectedProviderProfile.name }),
        email: Form.createFormField({ value: selectedProviderProfile.email }),
        phoneNumber: Form.createFormField({ value: selectedProviderProfile.phoneNumber }),
        website: Form.createFormField({ value: selectedProviderProfile.website }),
        description: Form.createFormField({ value: selectedProviderProfile.description }),
        logo: Form.createFormField({ value: selectedProviderProfile.logo }),
        coverPhoto: Form.createFormField({ value: selectedProviderProfile.coverPhoto }),
        receiveEmail: Form.createFormField({ value: selectedProviderProfile.receiveEmail }),
      };
    }
  })
);

export default enhance(Basic);
