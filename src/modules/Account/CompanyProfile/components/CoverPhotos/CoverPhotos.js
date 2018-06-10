import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

class CoverPhotos extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.value ? this.props.value.map((c, index) => ({ url: c, uid: index })) : [],
  };
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList })
    console.log(fileList)
    this.props.onChange(fileList)
  }

  customRequest = ({ onSuccess, onError, file }) => {
    return new Promise(((resolve, reject) => {
      setTimeout(() => {
          resolve(onSuccess('done'));
      }, 0);
    }));
    };


  render() {
    console.log(this.props)
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <React.Fragment>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={this.customRequest}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default CoverPhotos;