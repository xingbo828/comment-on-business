import React, { Component } from 'react';
import { Select } from 'antd';
import get from 'lodash/get'

import availableTypes from './availableTypes.json';

const Option = Select.Option;

class BusinessType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryType: get(this.props.value, 'primaryType') || 'MOVE',
      subTypes: get(this.props.value, 'subTypes') || []
    }
  }

  output = () => {
    this.props.onChange(this.state)
  }

  selectPrimaryType = (type) => {
    this.setState(() => ({
      primaryType: type,
      subTypes: []
    }), this.output)
  }
  selectSubTypes = (type) => {
    this.setState(() => ({
      subTypes: type
    }), this.output)
  }
  
  render() {
    const { primaryType, subTypes } = this.state;
    const selectedType = availableTypes.find(t => t.value === primaryType)
    return (
      <div style={{display: 'inline-block'}}>
        <Select onChange={this.selectPrimaryType} style={{ width: 120 }} value={primaryType}>
        {availableTypes.map(t => (
          <Option key={t.value} value={t.value}>{t.label}</Option>
        ))}
        </Select>
        {get(selectedType, 'subTypes') && (
          <Select onChange={this.selectSubTypes} style={{ marginLeft: 8, width: 350 }} value={subTypes} mode="multiple">
            {get(selectedType, 'subTypes').map(t => (
              <Option key={t.value} value={t.value}>{t.label}</Option>
            ))}
          </Select>
        )}
      </div>
    );
  }
}

export default BusinessType;