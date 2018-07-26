import React, { Component } from 'react';
import { array, func } from 'prop-types';
import { Select } from 'antd';
import availableCities from './availableCities.json'

const Option = Select.Option;

class ServiceAreas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  renderOptions = () => {
    return availableCities.reduce((result, currentProv) => {
      const provOpts = currentProv.cities.reduce((innerResult, currentCity) => {
        const opt = (
          <Option key={`${currentCity.name} | ${currentProv.name}`} value={`${currentCity.code}|${currentProv.code}`}>
            {`${currentCity.name} | ${currentProv.name}`}
          </Option>
        )
        return innerResult.concat([opt]);
      }, result);
      return provOpts;
    }, []);
  }

  handleOnChange = (selections) => {
    this.setState({
      value: selections
    }, () => this.props.onChange(selections))
  }

  render() {
    return (
      <Select
        optionFilterProp="key"
        mode="multiple"
        value={this.state.value}
        style={{ width: '100%' }}
        placeholder="Please select cities"
        onChange={this.handleOnChange}
      >
      {this.renderOptions()}
      </Select>
    );
  }
}

ServiceAreas.propTypes = {
  value: array,
  onChange: func
};

ServiceAreas.defaultProps = {
  value: [],
  onChange: console.log
}

export default ServiceAreas;