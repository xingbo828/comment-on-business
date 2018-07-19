import React, { Component } from 'react';
import { Form, Input, Switch, Upload, Button, Icon, Spin, Tabs, AutoComplete } from 'antd';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import has from 'lodash/has';
import RichEditor from './components/RichEditor';
import PaymentMethods from './components/PaymentMethods';
import ReviewInfo from './components/ReviewInfo';
import PhotoGallery from './components/PhotoGallery';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const AutoCompleteOption = AutoComplete.Option;

class CompanyProfile extends Component {
  state = {
    logoSelected: false,
    coverPhotoSelected: false,
    autoCompleteResult: [],
    activeTab: null
  };

  componentDidMount() {
    if (this.props.isRegistering || !has(this.props.location, 'state.tab')) {
      this.setState({
        activeTab: 'basic'
      });
    } else {
      this.setState({
        activeTab: this.props.location.state.tab
      });
    }
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleChange = (type) => info => {
    if(type === 'logo') {
      this.setState({
        logoSelected: info.fileList.length > 0
      });
    } else if(type === 'coverPhoto') {
      this.setState({
        coverPhotoSelected: info.fileList.length > 0
      });
    }
    
  };

  handleTabChange = (key) => {
    this.setState({
      activeTab: key
    });
  }



  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.ca', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let logo;
        if (values.logo) {
          if (isString(values.logo)) {
            logo = values.logo;
          } else if (isArray(values.logo) && values.logo.length > 0) {
            logo = values.logo[0].originFileObj;
          }
        }
        let coverPhoto;
        if (values.coverPhoto) {
          if (isString(values.coverPhoto)) {
            coverPhoto = values.coverPhoto;
          } else if (isArray(values.coverPhoto) && values.coverPhoto.length > 0) {
            coverPhoto = values.coverPhoto[0].originFileObj;
          }
        }
        this.props.submitForm(Object.assign({ section: this.state.activeTab }, values, { logo, coverPhoto }));
      }
    });
  };

  render() {
    const { isRegistering } = this.props;
    const { getFieldDecorator, getFieldProps } = this.props.form;
    const { logoSelected, coverPhotoSelected, autoCompleteResult } = this.state;

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

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

    const renderLogoUpload = () => {
      if (getFieldProps('logo').value && !logoSelected) {
        return (
          <Upload
            name="logo"
            className="avatar-uploader"
            listType="picture-card"
            onChange={this.handleChange('logo')}
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
          onChange={this.handleChange('logo')}
        >
          {!logoSelected && uploadButton}
        </Upload>
      );
    };

    const renderCoverPhotoUpload = () => {
      if (getFieldProps('coverPhoto').value && !coverPhotoSelected) {
        return (
          <Upload
            name="coverPhoto"
            className="avatar-uploader"
            listType="picture-card"
            onChange={this.handleChange('coverPhoto')}
          >
            <img width="100" src={getFieldProps('coverPhoto').value} alt="coverPhoto" />
          </Upload>
        );
      }
      return getFieldDecorator('coverPhoto', {
        getValueFromEvent: this.normFile
      })(
        <Upload
          name="coverPhoto"
          className="avatar-uploader"
          listType="picture-card"
          onChange={this.handleChange('coverPhoto')}
        >
          {!coverPhotoSelected && uploadButton}
        </Upload>
      );
    };

    return (
      <Spin spinning={this.props.isSubmitting}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs defaultActiveKey={this.state.activeTab} tabPosition="top" onChange={this.handleTabChange}>
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

              <FormItem {...formItemLayout} label="Logo">
                {renderLogoUpload()}
              </FormItem>

              <FormItem {...formItemLayout} label="Cover Photo">
                {renderCoverPhotoUpload()}
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

              <FormItem {...formItemLayout} label="Receive email notifications">
                {getFieldDecorator('receiveEmail', { initialValue: true, valuePropName: 'checked' })(<Switch checkedChildren="Yes" unCheckedChildren="No" />)}
              </FormItem>

              <FormItem {...formItemLayout} label="Website" hasFeedback>
                {getFieldDecorator('website', {
                  rules: [
                    {
                      required: false,
                      message: 'Please input your business website'
                    }
                  ]
                })(

                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                    placeholder="website"
                  >
                    <Input addonBefore="Http://" />
                  </AutoComplete>
                  
                  )}
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
                    <ReviewInfo />
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
            {!isRegistering && (
              <TabPane
                tab="Photo gallery"
                key="photoGallery"
                style={{ paddingTop: 20 }}
              >
                <FormItem {...metaFormItemLayout}>
                  {getFieldDecorator('photoGallery')(
                    <PhotoGallery />
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
