import React, { Component } from 'react';
import {
  Row,
  Col,
  Tooltip,
  Button,
  AutoComplete,
  Input,
  Card,
  Icon,
  Divider
} from 'antd';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';
import googleLogo from './google-my-business.jpg';
import yelpLogo from './yelp-logo.png';

const Option = AutoComplete.Option;

class ReviewInfo extends Component {
  state = {
    dataSource: {
      google: [],
      yelp: []
    }
  };

  componentDidMount() {
    const { google } = this.props;
    this.service = new google.maps.places.AutocompleteService();
  }

  updateDataSource = (type, selectorFn) => data => {
    const formattedData = selectorFn(data);
    const newState = Object.assign({}, this.state);
    newState['dataSource'][type] = formattedData;
    this.setState(newState);
  };

  handleGoogleSearch = searchQuery => {
    const selector = (data) => data.map(d => ({
      title: d.description,
      id: d.place_id
    }));
    if (searchQuery.length >= 3) {
      const request = {
        input: searchQuery,
        componentRestrictions: { country: 'ca' }
      };
      
      this.service.getPlacePredictions(
        request,
        this.updateDataSource('google', selector)
      );
    }
  };

  handleYelpSearch = async (searchQuery) => {
    const selector = (data) => data.map(d => ({
      title: d.name,
      id: d.id
    }));
    if (searchQuery.length >= 3) {
      const searchResult = await this.props.searchYelpBusiness(searchQuery);
      this.updateDataSource('yelp', selector)(searchResult)
    }
  };

  handleSelect = type => (v, ins) => {
    const { value, onChange } = this.props;
    const updatedValue = Object.assign({}, value, {
      [type]: { desc: ins.props.children, id: ins.props.value }
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
      <Option key={opt.title} value={opt.id}>
        {opt.title}
      </Option>
    ));
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col span={6}><img width="100" src={googleLogo} alt="Google Business" /></Col>
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
              autoComplete="off"
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

  renderYelpSearch = () => {
    const options = this.state.dataSource.yelp.map(opt => (
      <Option key={opt.title} value={opt.id}>
        {opt.title}
      </Option>
    ));
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col span={6}><img width="100" src={yelpLogo} alt="Yelp Business" /></Col>
        <Col span={16}>
          <AutoComplete
            dataSource={options}
            onSelect={this.handleSelect('yelpInfo')}
            onSearch={debounce(this.handleYelpSearch, 300)}
            style={{ width: '100%' }}
          >
            <Input
              prefix={<Icon type="search" />}
              autoComplete="off"
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
      <Col span={6}><img width="100" src={googleLogo} alt="Google Business" /></Col>
      <Col span={16}><strong>{googleInfo.desc}</strong></Col>
      <Col offset={1} span={1}>
        <Button onClick={this.handleRemove('googleInfo')} shape="circle" icon="delete" type="danger" />
      </Col>
    </Row>
  );

  renderYelpSelectionResult = yelpInfo => (
    <Row type="flex" justify="space-around" align="middle">
      <Col span={6}><img width="100" src={yelpLogo} alt="Yelp Business" /></Col>
      <Col span={16}><strong>{yelpInfo.desc}</strong></Col>
      <Col offset={1} span={1}>
        <Button onClick={this.handleRemove('yelpInfo')} shape="circle" icon="delete" type="danger" />
      </Col>
    </Row>
  );

  render() {
    const {
      value,
      hasGoogleInfo,
      hasYelpInfo
    } = this.props;


    return (
      <Card title={
        <React.Fragment>
        <h3>Connect to your review services</h3>
        <p style={{fontSize: '14px', color: 'rgba(0,0,0,.45)'}}>We will retrieve your business review information from the connected services.</p>
        </React.Fragment>
      }>
        {hasGoogleInfo
          ? this.renderGoogleSelectionResult(value.googleInfo)
          : this.renderGoogleSearch()}
        <Divider/>
        {hasYelpInfo
        ? this.renderYelpSelectionResult(value.yelpInfo)
        : this.renderYelpSearch()}
      </Card>
    );
  }
}

export default ReviewInfo;
