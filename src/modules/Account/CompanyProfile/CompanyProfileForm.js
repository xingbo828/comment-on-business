import React, { Component } from 'react';
import { Form, Input, Upload, Button, Icon, Spin, Tabs } from 'antd';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import has from 'lodash/has';
import RichEditor from './components/RichEditor';
import PaymentMethods from './components/PaymentMethods';
import ReviewInfo from './components/ReviewInfo';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CompanyProfile extends Component {
  state = {
    logoSelected: false
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleChange = info => {
    this.setState({
      logoSelected: info.fileList.length > 0
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let logo;
        if (values.logo) {
          if (isString(values.logo)) {
            logo = values.logo;
          } else if (isArray(values.logo) && values.logo.length > 0) {
            logo = values.logo[0].originFileObj;
          }
        }
        this.props.submitForm(Object.assign({}, values, { logo }));
      }
    });
  };

  render() {
    const { isRegistering } = this.props;
    const { getFieldDecorator, getFieldProps } = this.props.form;
    const { logoSelected } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };

    const metaFormItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12, offset: 6 }
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
          offset: 6
        }
      }
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const renderUpload = () => {
      if (getFieldProps('logo').value && !logoSelected) {
        return (
          <Upload
            name="logo"
            className="avatar-uploader"
            listType="picture-card"
            onChange={this.handleChange}
          >
            <img width="100" src={getFieldProps('logo').value} alt="Logo" />
          </Upload>
        );
      }
      return getFieldDecorator('logo', {
        getValueFromEvent: this.normFile
      })(
        <Upload
          name="logo"
          className="avatar-uploader"
          listType="picture-card"
          onChange={this.handleChange}
        >
          {!logoSelected && uploadButton}
        </Upload>
      );
    };

    const getActiveTab = () => {
      if(this.props.isRegistering) {
        return 'basic';
      }

      if(!has(this.props.location, 'state.tab')) {
        return 'basic';
      }

      return this.props.location.state.tab;
    }

    return (
      <Spin spinning={this.props.isSubmitting}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs defaultActiveKey={getActiveTab()} tabPosition="top">
            <TabPane tab="Basic information" key="basic">
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

              <FormItem {...formItemLayout} label="Upload">
                {renderUpload()}
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
                })(<RichEditor />)}
              </FormItem>
            </TabPane>
            {!isRegistering && <TabPane tab="Payment methods" key="payment-methods">
              <FormItem
                {...metaFormItemLayout}
              >
                 {getFieldDecorator('paymentMethods')(<PaymentMethods />)}
              </FormItem>
            </TabPane>}
            {!isRegistering &&<TabPane tab="Connect to review services" key="review">
              <FormItem
                {...metaFormItemLayout}
              >
                 {getFieldDecorator('reviewInfo')(<ReviewInfo google={window.google} />)}
              </FormItem>
            </TabPane>}
          </Tabs>
          <FormItem {...tailFormItemLayout}>
            <Button size="large" icon="save" type="primary" htmlType="submit">
              Save
            </Button>
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default CompanyProfile;
