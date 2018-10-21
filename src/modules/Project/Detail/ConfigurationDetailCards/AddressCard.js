import React from 'react';
import { Card, Icon } from 'antd';
import { withStateHandlers } from 'recompose';
import get from 'lodash/get';

import AddressMap from './AddressMap';
import { InnerCardItem } from './styles';

const AddressCard = ({ status, projectDetail, distance, setDistance }) => {
  return (
    <React.Fragment>
      {status === 'LOADED' && (
        <AddressMap
          google={window.google}
          callback={setDistance}
          pickUpAddress={get(
            projectDetail,
            'configuration.addresses.pickUpAddress'
          )}
          deliveryAddress={get(
            projectDetail,
            'configuration.addresses.deliveryAddress'
          )}
        />
      )}
      <Card
        loading={status === 'PENDING'}
        bordered={true}
        style={{ marginBottom: '.75rem' }}
      >
        <InnerCardItem>
          <strong>Distance: </strong>
          <span>
            <Icon type="car" /> {distance}
          </span>
        </InnerCardItem>
        <InnerCardItem>
          <strong>Pick-up address:</strong>
          <span>
            <Icon type="home" />{' '}
            {get(
              projectDetail,
              'configuration.addresses.formattedPickUpAddress'
            )}
          </span>
        </InnerCardItem>
        <InnerCardItem>
          <strong>Delivery address:</strong>
          <span>
            <Icon type="environment-o" />{' '}
            {get(
              projectDetail,
              'configuration.addresses.formattedDeliveryAddress'
            )}
          </span>
        </InnerCardItem>
      </Card>
    </React.Fragment>
  );
};

export default withStateHandlers(
  { distance: undefined },
  { setDistance: () => distance => ({ distance }) }
)(AddressCard);
