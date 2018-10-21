import React from 'react';
import get from 'lodash/get';
import { Card } from 'antd';
import startsWith from 'lodash/startsWith';
import capitalize from 'lodash/capitalize';

import { InnerCardItem } from './styles';

const PickUpCard = ({ status, projectDetail }) => {
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
      title="Pick-up location info"
      bordered={true}
      style={{ marginBottom: '.75rem' }}
    >
      <InnerCardItem>
        <strong>Pick-up residence type:</strong>
        {get(projectDetail, 'configuration.pickUp.residenceType')}
      </InnerCardItem>
      <InnerCardItem>
        <strong>Pick-up access:</strong>
        {renderAccessType(
          get(projectDetail, 'configuration.pickUp.pickUpAccess')
        )}
      </InnerCardItem>
      <InnerCardItem>
        <strong>Pick-up parking location:</strong>
        {renderAccessType(
          get(projectDetail, 'configuration.pickUp.parkingLocation')
        )}
      </InnerCardItem>
      <InnerCardItem>
        <strong>Pick-up junk removal:</strong>
        {renderAccessType(
          get(projectDetail, 'configuration.pickUp.pickUpJunkRemoval')
        )}
      </InnerCardItem>
    </Card>
  );
};

export default PickUpCard;
