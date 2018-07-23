import { compose, withProps } from 'recompose';
import { Form, message } from 'antd';

import PhotoGallery from './PhotoGallery';

const enhance = compose(
  withProps(props => ({
    submitForm: async (providerInfo) => {
      props.updateIsSubmitting(true)
      try {
        await props.editProvider(Object.assign({ type: 'photo-gallery', providerId: props.selectedProviderProfile.id }, providerInfo));
        message.success('Update Successful');
      } catch(error) {
        console.error(error)
        // message.error(error);
      }
      props.updateIsSubmitting(false)
      
    }
  })),
  Form.create({
    mapPropsToFields({ selectedProviderProfile }) {
      return {
        photoGallery: Form.createFormField({ value: selectedProviderProfile.photoGallery })
      };
    }
  })
);

export default enhance(PhotoGallery);
