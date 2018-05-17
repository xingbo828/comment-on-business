import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';

const FormItem = Form.Item;

const ResetPassword = ({ history, isSubmitting, form, submitForm }) => {
  const { getFieldDecorator } = form;

  const goBack = e => {
    e.preventDefault();
    history.goBack();
  };
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        submitForm(values);
      }
    });
  };

  return (
    <Spin spinning={isSubmitting}>
      <h1>Reset password</h1>
      <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Please input your email!' },
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem>
          <Button style={{ float: 'left' }} onClick={goBack}>
            <Icon type="left" /> Back
          </Button>
          <Button style={{ float: 'right' }} type="primary" htmlType="submit">
            <Icon type="mail" /> Send
          </Button>
        </FormItem>
      </Form>
    </Spin>
  );
};

export default ResetPassword;
