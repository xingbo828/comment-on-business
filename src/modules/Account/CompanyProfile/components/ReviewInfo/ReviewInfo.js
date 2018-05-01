import React, { Component } from 'react';
import {
  Row,
  Col,
  Tooltip,
  Button,
  AutoComplete,
  Input,
  Card,
  Icon
} from 'antd';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';
import googleLogo from './google-my-business.jpg';

const Option = AutoComplete.Option;

class ReviewInfo extends Component {
  state = {
    dataSource: {
      google: []
    }
  };

  componentDidMount() {
    const { google } = this.props;
    this.service = new google.maps.places.AutocompleteService();
  }

  updateDataSource = type => data => {
    const formattedData = data.map(d => ({
      title: d.description,
      placeId: d.place_id
    }));
    const newState = Object.assign({}, this.state, {
      dataSource: { [type]: formattedData }
    });
    this.setState(newState);
  };

  handleGoogleSearch = searchQuery => {
    if (searchQuery.length >= 3) {
      const request = {
        input: searchQuery,
        componentRestrictions: { country: 'ca' }
      };
      this.service.getPlacePredictions(
        request,
        this.updateDataSource('google')
      );
    }
  };

  handleSelect = type => (v, ins) => {
    const { value, onChange } = this.props;
    const updatedValue = Object.assign({}, value, {
      [type]: { desc: ins.props.children, placeId: ins.props.value }
    });
    onChange(updatedValue);
  };

  handleRemove = type => e => {
    const { value, onChange } = this.props;
    const updatedValue = omit(value, type);
    onChange(updatedValue);
  }

  renderGoogleSearch = () => {
    const options = this.state.dataSource.google.map(opt => (
      <Option key={opt.title} value={opt.placeId}>
        {opt.title}
      </Option>
    ));
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col span={6}><img width="150" src={googleLogo} alt="Google Business" /></Col>
        <Col span={16}>
          <AutoComplete
            dataSource={options}
            onSelect={this.handleSelect('googleInfo')}
            onSearch={debounce(this.handleGoogleSearch, 300)}
            style={{ width: '100%' }}
          >
            <Input
              prefix={<Icon type="search" />}
              placeholder="search your business"
            />
          </AutoComplete>
        </Col>
        <Col offset={1} span={1}>
          <Tooltip title="Find your business from Google places so that we can pull your business reviews.">
            <Icon type="question-circle-o" style={{ fontSize: 18 }} />
          </Tooltip>
        </Col>
      </Row>
    );
  };

  renderGoogleSelectionResult = googleInfo => (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={6}><img width="150" src={googleLogo} alt="Google Business" /></Col>
      <Col span={16}><strong>{googleInfo.desc}</strong></Col>
      <Col offset={1} span={1}>
        <Button onClick={this.handleRemove('googleInfo')} shape="circle" icon="delete" type="danger" />
      </Col>
    </Row>
  );

  render() {
    const {
      value
    } = this.props;

    const googleInfo = value ? value.googleInfo : undefined;

    return (
      <Card title="Connect to your review services">
        {googleInfo
          ? this.renderGoogleSelectionResult(googleInfo)
          : this.renderGoogleSearch()}
      </Card>
    );
  }
}

export default ReviewInfo;
