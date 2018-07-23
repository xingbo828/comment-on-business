import React, { Component } from 'react';
import { Form, Button, Spin } from 'antd';
import PhotoGallery from '../../components/PhotoGallery';

const FormItem = Form.Item;


const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 20, offset: 2 },
    lg: { span: 16, offset: 4 },
    xl: { span: 14, offset: 5 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    md: {
      offset: 2
    },
    lg: {
      offset: 4
    },
    xl: {
      offset: 5
    }
  }
};

class PaymentMethodsForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submitForm(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin spinning={this.props.isSubmitting}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('photoGallery')(<PhotoGallery />)}
          </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button
            size="large"
            icon="save"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default PaymentMethodsForm;