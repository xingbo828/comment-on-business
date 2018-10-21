import React from 'react';
import { Card, Divider, Icon } from 'antd';
import moment from 'moment';
import get from 'lodash/get';

import { InnerCardItem } from './styles';

const PickDateCard = ({ status, projectDetail }) => {
  const getStorageDays = () => {
    const d = get(projectDetail, 'configuration.date.storage', '')
    return d === 'none' ? d : d.split('|')[1]
  }
  return (
    <Card
      loading={status === 'PENDING'}
      title="Customer preferred dates"
      bordered={true}
      style={{ marginBottom: '.75rem' }}
    >
      <InnerCardItem>
        {get(projectDetail, 'configuration.date.pickUpDate', [])
          .sort((d1, d2) => (d1 > d2 ? -1 : 1))
          .map(d => (
            <span
              key={d}
              style={{ minWidth: '220px', marginBottom: '.25rem' }}
            >
              <Icon type="calendar" />{' '}
              {moment(d).format('dddd, MMMM, D, YYYY')}
            </span>
          ))}
      </InnerCardItem>
      <Divider />
      <InnerCardItem>
      <strong>Storage:</strong>
      <span>{getStorageDays()}</span>
      </InnerCardItem>
    </Card>
  );
};

export default PickDateCard;
