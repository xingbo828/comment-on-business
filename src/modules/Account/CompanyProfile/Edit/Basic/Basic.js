import React, { Component } from 'react';
import { Form, Input, Switch, Upload, Button, Icon, Spin, AutoComplete } from 'antd';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty'

import RichEditor from '../../components/RichEditor';
import BusinessType, { validator as BusinessTypeValidator} from '../../components/BusinessType';
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

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

class Basic extends Component {

  state = {
    logoSelected: false,
    coverPhotoSelected: false,
    autoCompleteResult: []
  };



  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleUploadFileChange = (type) => info => {
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

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.ca', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  flattenImg = (img) => {
    if (img) {
      if (isString(img)) {
        return img;
      } else if (isArray(img) && img.length > 0) {
        return img[0].originFileObj;
      }
    }
    return undefined;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const logo = this.flattenImg(values.logo);
        const coverPhoto = this.flattenImg(values.coverPhoto);
        this.props.submitForm(Object.assign(values, { logo, coverPhoto }));
      }
    });
  };

  renderUploadButton = () => (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  getSlug = () => {
    const { getFieldValue, isFieldTouched } = this.props.form;
    const prefix = process.env.REACT_APP_ENV === 'production' ? 'https://inneed.ca/profile/' : 'https://dev.inneed.ca/profile/';
    const converSlug = (name) => {
      const n = name || ''
      return n.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove all non-word chars
        .replace(/-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    };

    const concatPrefix = (prefix, slug) => {
      if(isEmpty(slug)) {
        return ''
      }
      return prefix + slug
    }

    if (this.props.isNewUser) {
      return concatPrefix(prefix, converSlug(getFieldValue('name')))
    }
    else{
      if (isFieldTouched('name') === true) {
        return concatPrefix(prefix, converSlug(getFieldValue('name')))
      } else {
        return concatPrefix(prefix, this.props.selectedProviderProfile.slug)
      }
    }
  }

  renderLogoUpload = (getFieldProps, getFieldDecorator) => logoSelected => {
    if (getFieldProps('logo').value && !logoSelected) {
      return (
        <Upload
          name="logo"
          className="avatar-uploader"
          listType="picture-card"
          onChange={this.handleUploadFileChange('logo')}
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
        onChange={this.handleUploadFileChange('logo')}
      >
        {!logoSelected && this.renderUploadButton()}
      </Upload>
    );
  };

  renderCoverPhotoUpload = (getFieldProps, getFieldDecorator) => coverPhotoSelected  => {
    if (getFieldProps('coverPhoto').value && !coverPhotoSelected) {
      return (
        <Upload
          name="coverPhoto"
          className="avatar-uploader"
          listType="picture-card"
          onChange={this.handleUploadFileChange('coverPhoto')}
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
        onChange={this.handleUploadFileChange('coverPhoto')}
      >
        {!coverPhotoSelected && this.renderUploadButton()}
      </Upload>
    );
  };


  render() {
    const { getFieldDecorator, getFieldProps } = this.props.form;
    const { logoSelected, coverPhotoSelected, autoCompleteResult } = this.state;

    return (
      <Spin spinning={this.props.isSubmitting}>
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

              <FormItem {...formItemLayout} label="Profile URL" >
                <Input prefix={<Icon type="link" theme="outlined" />} value={this.getSlug()} />
              </FormItem>

              <FormItem {...formItemLayout} label="Business Type" hasFeedback required>
                {getFieldDecorator('businessType', {
                  rules: [
                    {
                      validator: BusinessTypeValidator
                    }
                  ]
                })(<BusinessType />)}
              </FormItem>

              <FormItem {...formItemLayout} label="Logo">
                {this.renderLogoUpload(getFieldProps, getFieldDecorator)(logoSelected)}
              </FormItem>

              <FormItem {...formItemLayout} label="Cover Photo">
                {this.renderCoverPhotoUpload(getFieldProps, getFieldDecorator)(coverPhotoSelected)}
              </FormItem>

              <FormItem {...formItemLayout} label="Service Address" hasFeedback>
                {getFieldDecorator('businessServiceAddress', {
                  rules: [
                    {
                      required: false,
                      message: 'Please input your business address'
                    }
                  ]
                })(<Input />)}
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
                    dataSource={autoCompleteResult.map(w => (
                      <AutoCompleteOption key={w}>{w}</AutoCompleteOption>
                    ))}
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
                  { this.props.isNewUser ? 'Continue' : 'Save'}
                </Button>
              </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default Basic;