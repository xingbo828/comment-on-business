import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { compose } from 'recompose';
import { StyledIcon, OtherServicesWrapper } from './Styles';

const FormItem = Form.Item;

const LoginPanel = ({ form, onSubmit, facebookLogin, googleLogin }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onSubmit();
      }
    });
  };
  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
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
          <a style={{ display: 'block', float: 'right' }} href="">
            Forgot password
          </a>
        </FormItem>
      </Form>
      <OtherServicesWrapper>
        Login with other services
        <StyledIcon onClick={googleLogin} type="google" color="#d31b1c" />
        <StyledIcon onClick={facebookLogin} type="facebook" color="#3b5899" />
      </OtherServicesWrapper>
    </React.Fragment>
  );
};

export default compose(Form.create())(LoginPanel);
