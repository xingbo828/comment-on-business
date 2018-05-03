import React, { Component } from 'react';
import { List, Switch, Icon, Row, Col } from 'antd';
import isArray from 'lodash/isArray';
import includes from 'lodash/includes';

import cash from './imgs/cash.png';
import interac from './imgs/interac.png';
import mastercard from './imgs/mastercard.png';
import visa from './imgs/visa.png';

class PaymentMethods extends Component {
  onCheck = type => on => {
    const { onChange, value } = this.props;
    const v = isArray(value) ? value : [];
    if (on) {
      onChange(v.concat([type]));
    } else {
      onChange(v.filter(i => i !== type));
    }
  };

  isChecked = v => {
    const { value } = this.props;
    return isArray(value) && includes(value, v);
  };

  render() {
    return (
      <List size="large" bordered header={<h3>Payment Methods </h3>}>
        <List.Item key="cash">
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{ width: '100%' }}
          >
            <Col>
              <img
                src={cash}
                alt="cash"
                style={{ width: '60px', height: 'auto' }}
              />
            </Col>
            <Col>
              <Switch
                checked={this.isChecked('cash')}
                onChange={this.onCheck('cash')}
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="cross" />}
              />
            </Col>
          </Row>
        </List.Item>
        <List.Item key="debit">
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{ width: '100%' }}
          >
            <Col>
              <img
                src={interac}
                alt="interac card"
                style={{ width: '60px', height: 'auto' }}
              />
            </Col>
            <Col>
              <Switch
                checked={this.isChecked('debit')}
                onChange={this.onCheck('debit')}
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="cross" />}
              />
            </Col>
          </Row>
        </List.Item>
        <List.Item key="credit">
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{ width: '100%' }}
          >
            <Col>
              <img
                src={visa}
                alt="visa card"
                style={{ width: '60px', height: 'auto', marginRight: 5 }}
              />
              <img
                src={mastercard}
                alt="master card"
                style={{ width: '60px', height: 'auto' }}
              />
            </Col>
            <Col>
          <Switch
            checked={this.isChecked('credit')}
            onChange={this.onCheck('credit')}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
          />
          </Col>
          </Row>
        </List.Item>
      </List>
    );
  }
}

export default PaymentMethods;
