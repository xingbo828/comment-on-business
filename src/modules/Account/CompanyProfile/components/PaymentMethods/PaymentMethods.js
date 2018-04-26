import React, { Component } from 'react';
import { List, Switch, Icon } from 'antd';
import isArray from 'lodash/isArray';
import includes from 'lodash/includes';

class PaymentMethods extends Component  {
  
  onCheck = (type) => (on) => {
    const { onChange, value } = this.props;
    const v = isArray(value)  ? value : [];
    if(on) {
      onChange(v.concat([type]))
    } else {
      onChange(v.filter(i => i!== type))
    }
  };

  isChecked = (v) => {
    const { value } = this.props;
    return isArray(value) && includes(value, v);
  }

  render() {
    return (
      <List size="large" bordered header={<h3>Payment Methods</h3>}>
        <List.Item key="cash">
          <List.Item.Meta title="Cash" />
          <Switch checked={this.isChecked('cash')} onChange={this.onCheck('cash')} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />}/>
        </List.Item>
        <List.Item key="debit">
          <List.Item.Meta title="Debit Card" />
          <Switch checked={this.isChecked('debit')} onChange={this.onCheck('debit')} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />}/>
        </List.Item>
        <List.Item key="credit">
          <List.Item.Meta title="Credit Card" />
          <Switch checked={this.isChecked('credit')} onChange={this.onCheck('credit')} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />}/>
        </List.Item>
      </List>
    );
  }
};

export default PaymentMethods;
