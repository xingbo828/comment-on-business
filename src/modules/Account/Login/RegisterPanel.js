import React, { Component } from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { compose } from 'recompose';
import { StyledIcon, OtherServicesWrapper } from './Styles';
const FormItem = Form.Item;

class RegisterPanel extends Component {
  state = {
    confirmDirty: false
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const {
      isSubmitting,
      form: { getFieldDecorator },
      facebookLogin,
      googleLogin
    } = this.props;
    return (
      <Spin spinning={isSubmitting}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem label="Password">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  min: 6,
                  message: 'Password need to be at least 6 characters in length'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
              />
            )}
          </FormItem>
          <FormItem label="Confirm Password">
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                {
                  min: 6,
                  message: 'Password need to be at least 6 characters in length'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </FormItem>
        </Form>

        <OtherServicesWrapper>
          Register with other services
          <StyledIcon onClick={googleLogin} type="google" color="#d31b1c" />
          <StyledIcon onClick={facebookLogin} type="facebook" color="#3b5899" />
        </OtherServicesWrapper>
      </Spin>
    );
  }
}

export default compose(Form.create())(RegisterPanel);
