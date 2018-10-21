import React from 'react';
import { Card, Divider } from 'antd';
import get from 'lodash/get';
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'

import { InnerCardItem } from './styles';

const ItemsCard = ({ status, projectDetail }) => {
  const renderItems = items => {
    if (isNil(items) || isEmpty(items)) {
      return 'N/A';
    }
    return Object.keys(items).map(key => (
      <div key={key} style={{ textAlign: 'right' }}>
        {key} x {items[key]}
      </div>
    ));
  };
  return (
    <Card
      loading={status === 'PENDING'}
      title="Moving items"
      bordered={true}
      style={{ marginBottom: '.75rem' }}
    >
      <InnerCardItem>
        <strong>Special care:</strong>
        <span>
          {renderItems(get(projectDetail, 'configuration.items.specialCare'))}
        </span>
      </InnerCardItem>
      <Divider />
      <InnerCardItem>
        <strong>Appliances:</strong>
        <span>
          {renderItems(get(projectDetail, 'configuration.items.appliances'))}
        </span>
      </InnerCardItem>
      <Divider />
      <InnerCardItem>
        <strong>Decore:</strong>
        <span>
          {renderItems(get(projectDetail, 'configuration.items.decore'))}
        </span>
      </InnerCardItem>
      <Divider />
      <InnerCardItem>
        <strong>Additional items information:</strong>
        {get(projectDetail, 'configuration.items.otherItems') || 'N/A'}
      </InnerCardItem>
    </Card>
  );
};

export default ItemsCard;
