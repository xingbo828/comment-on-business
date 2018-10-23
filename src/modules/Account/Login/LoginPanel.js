import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { StyledIcon, OtherServicesWrapper } from './Styles';

const FormItem = Form.Item;

const LoginPanel = ({
  isSubmitting,
  form,
  onSubmit,
  facebookLogin,
  googleLogin
}) => {
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onSubmit(values);
      }
    });
  };
  return (
    <Spin spinning={isSubmitting}>
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
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              {
                min: 6,
                message: 'Password need to be at least 6 characters in length'
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          <Link
            style={{ display: 'block', float: 'right' }}
            to="/reset-password"
          >
            Forgot password
          </Link>
        </FormItem>
      </Form>
      <OtherServicesWrapper>
        Login with other services
        <StyledIcon onClick={googleLogin} type="google" color="#d31b1c" />
        {/* <StyledIcon onClick={facebookLogin} type="facebook" color="#3b5899" /> */}
      </OtherServicesWrapper>
    </Spin>
  );
};

export default compose(Form.create())(LoginPanel);
