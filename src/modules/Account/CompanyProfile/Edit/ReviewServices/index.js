import { compose, withProps } from 'recompose';
import { Form, message } from 'antd';

import ReviewServices from './ReviewServices';

const enhance = compose(
  withProps(props => ({
    submitForm: async (providerInfo) => {
      props.updateIsSubmitting(true)
      try {
        await props.editProvider(Object.assign({ type: 'review-services', providerId: props.selectedProviderProfile.id }, providerInfo));
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
        reviewInfo: Form.createFormField({ value: selectedProviderProfile.reviewInfo || {} })
      };
    }
  })
);

export default enhance(ReviewServices);
