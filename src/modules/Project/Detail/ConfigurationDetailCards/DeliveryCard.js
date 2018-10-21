import React from 'react';
import get from 'lodash/get';
import { Card } from 'antd';
import startsWith from 'lodash/startsWith';
import capitalize from 'lodash/capitalize';

import { InnerCardItem } from './styles';

const DeliveryCard = ({ status, projectDetail }) => {
  const renderAccessType = access => {
    if (startsWith(access, 'stairs')) {
      const accessAry = access.split(' | ');
      accessAry[0] = capitalize(accessAry[0]);
      accessAry[1] = `${accessAry[1]} Floor(s)`;
      return accessAry.join(' | ');
    }
    return capitalize(access);
  };
  return (
    <Card
      loading={status === 'PENDING'}
      title="Delivery location info"
      bordered={true}
      style={{ marginBottom: '.75rem' }}
    >
      <InnerCardItem>
        <strong>Delivery residence type:</strong>
        {get(projectDetail, 'configuration.delivery.residenceType')}
      </InnerCardItem>
      <InnerCardItem>
        <strong>Delivery access:</strong>
        {renderAccessType(
          get(projectDetail, 'configuration.delivery.deliveryAccess')
        )}
      </InnerCardItem>
    </Card>
  );
};

export default DeliveryCard;
