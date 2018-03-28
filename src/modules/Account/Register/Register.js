import React, { Component } from 'react';
import {
  Form,
  Input,
  Upload,
  Button,
  Icon,
  Spin
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;


class Register extends Component {
  state = {
    logoSelected: false,
    isSubmitting: false
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleChange = (info) => {
    this.setState({
      logoSelected: info.fileList.length > 0
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const logo = (values.logo && values.logo.length > 0) ? values.logo[0].originFileObj : undefined;
        this.setState({
          isSubmitting: true
        })
        await this.props.createProvider(Object.assign({}, values, { logo }));
        this.props.history.push({
          pathname: '/'
        })

      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { logoSelected } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Spin spinning={this.state.isSubmitting}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Business Name" hasFeedback>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your business name!'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Upload"
        >
          {getFieldDecorator('logo', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo"  className="avatar-uploader" listType="picture-card" onChange={this.handleChange}>
               {!logoSelected && uploadButton}
            </Upload>
          )}
        </FormItem>


        <FormItem {...formItemLayout} label="Phone Number" hasFeedback>
          {getFieldDecorator('phoneNumber', {
            rules: [
              {
                pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
                message: 'The input is not valid phone number!'
              },
              {
                required: true,
                message: 'Please input business phone number!'
              }
            ]
          })(<Input addonBefore="+1" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="E-mail" hasFeedback>
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
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Description" hasFeedback>
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'Please input your business description!'
              }
            ]
          })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
      </Spin>
    );
  }
}

export default Register;
