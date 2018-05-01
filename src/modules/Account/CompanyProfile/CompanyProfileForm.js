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

  getActiveTab = () => {
    if (this.props.isRegistering) {
      return 'basic';
    }

    if (!has(this.props.location, 'state.tab')) {
      return 'basic';
    }

    return this.props.location.state.tab;
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
        sm: { span: 24 },
        md: { span: 6 },
        lg: { span: 4 },
        xl: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 16 },
        lg: { span: 18 },
        xl: { span: 16 }
      }
    };

    const metaFormItemLayout = {
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
          offset: 6
        },
        lg: {
          offset: 4
        }
      }
    };

    const metaTailFormItemLayout = {
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

    return (
      <Spin spinning={this.props.isSubmitting}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs defaultActiveKey={this.getActiveTab()} tabPosition="top">
            <TabPane
              tab="Basic information (Required)"
              key="basic"
              style={{ paddingTop: 20 }}
            >
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
            </TabPane>
            {!isRegistering && (
              <TabPane
                tab="Payment methods"
                key="payment-methods"
                style={{ paddingTop: 20 }}
              >
                <FormItem {...metaFormItemLayout}>
                  {getFieldDecorator('paymentMethods')(<PaymentMethods />)}
                </FormItem>
                <FormItem {...metaTailFormItemLayout}>
                  <Button
                    size="large"
                    icon="save"
                    type="primary"
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </FormItem>
              </TabPane>
            )}
            {!isRegistering && (
              <TabPane
                tab="Connect to review services"
                key="review"
                style={{ paddingTop: 20 }}
              >
                <FormItem {...metaFormItemLayout}>
                  {getFieldDecorator('reviewInfo')(
                    <ReviewInfo google={window.google} />
                  )}
                </FormItem>
                <FormItem {...metaTailFormItemLayout}>
                  <Button
                    size="large"
                    icon="save"
                    type="primary"
                    htmlType="submit"
                  >
                    Save
                  </Button>
                </FormItem>
              </TabPane>
            )}
          </Tabs>
        </Form>
      </Spin>
    );
  }
}

export default CompanyProfile;
