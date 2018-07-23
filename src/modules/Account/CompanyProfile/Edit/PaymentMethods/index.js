import { compose, withProps } from 'recompose';
import { Form, message } from 'antd';

import PaymentMethods from './PaymentMethods';

const enhance = compose(
  withProps(props => ({
    submitForm: async (providerInfo) => {
      props.updateIsSubmitting(true)
      try {
        await props.editProvider(Object.assign({ type: 'payment-methods', providerId: props.selectedProviderProfile.id }, providerInfo));
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
        paymentMethods: Form.createFormField({ value: selectedProviderProfile.paymentMethods || {} })
      };
    }
  })
);

export default enhance(PaymentMethods);
