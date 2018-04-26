import React, { Component } from 'react';
import { Input, Divider, Card, Icon } from 'antd';
import set from 'lodash/set';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';

const InputGroup = Input.Group;

class ReviewInfo extends Component {
  handleChange = path => e => {
    const { value, onChange } = this.props;
    const v = isUndefined(value) ? {} : value;
    const updated = set(v, path, e.target.value);
    onChange(updated);
  };
  render() {
    const { value } = this.props;
    return (
      <Card title="Connect to social media review services">
        <InputGroup size="large" compact>
          <Icon
            type="google"
            style={{
              color: 'darkred',
              fontSize: 18,
              lineHeight: '40px',
              width: '10%'
            }}
          />
          <Input
            onChange={this.handleChange('google.accountId')}
            placeholder="Google business account ID"
            style={{ width: '45%' }}
            value={get(value, 'google.accountId')}
          />
          <Input
            onChange={this.handleChange('google.locationId')}
            placeholder="Google business location ID"
            style={{ width: '45%' }}
            value={get(value, 'google.locationId')}
          />
        </InputGroup>
        <Divider />
        <InputGroup size="large" compact>
          <Icon
            type="facebook"
            style={{
              color: 'darkblue',
              fontSize: 18,
              lineHeight: '40px',
              width: '10%'
            }}
          />
          <Input
            value={get(value, 'facebook.businessId')}
            placeholder="Facebook business ID"
            onChange={this.handleChange('facebook.businessId')}
            style={{ width: '90%' }}
          />
        </InputGroup>
      </Card>
    );
  }
}

export default ReviewInfo;
