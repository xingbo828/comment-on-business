import React from 'react';
import { withStateHandlers } from 'recompose'
import { Card, Row, Col, Icon, Divider } from 'antd';
import styled from 'styled-components';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import startsWith from 'lodash/startsWith'
import isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize'
import moment from 'moment';
import AddressMap from './AddressMap';

const InnerCardItem = styled.span`
  display: flex;
  padding: 0.5rem 0;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ConfigurationDetail = ({
  distance,
  setDistance,
  projectType,
  project: { status, projectDetail }
}) => {
  const renderItems = items => {
    if (isNil(items) || isEmpty(items)) {
      return 'N/A';
    }
    return Object.keys(items).map(key => (
      <div key={key} style={{textAlign: 'right'}}>
        {key} x {items[key]}
      </div>
    ));
  };

  const renderAccessType = (access) => {
    if (startsWith(access, 'stairs')) {
      const accessAry = access.split(' | ')
      accessAry[0] = capitalize(accessAry[0])
      accessAry[1] = `${accessAry[1]} Floor(s)`
      return accessAry.join(' | ')
    }
    return capitalize(access)
  }

  return (
    <div style={{ background: 'rgb(240, 242, 245)', padding: '1rem' }}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            loading={status === 'PENDING'}
            bordered={true}
            style={{ marginBottom: '.75rem' }}
          >
            <InnerCardItem>
              <strong>Distance: </strong>
              <span>
                <Icon type="car" />{' '}
                {distance}
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
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card
            loading={status === 'PENDING'}
            title="Contact"
            bordered={true}
            style={{ marginBottom: '.75rem' }}
          >
            <InnerCardItem>
              <strong>Name:</strong>
              {get(projectDetail, 'owner.displayName')}
            </InnerCardItem>
            {projectType === 'DIRECT' && (
              <InnerCardItem>
                <strong>Phone number:</strong>
                {get(projectDetail, 'configuration.contactInfo.phoneNumber')}
              </InnerCardItem>
            )}
            {projectType === 'DIRECT' && (
              <InnerCardItem>
                <strong>Email:</strong>
                {get(projectDetail, 'configuration.contactInfo.email')}
              </InnerCardItem>
            )}
            <InnerCardItem>
              <strong>Notes:</strong>
              {get(projectDetail, 'configuration.additionalNotes') || 'N/A'}
            </InnerCardItem>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card
            loading={status === 'PENDING'}
            title="Dates"
            bordered={true}
            style={{ marginBottom: '.75rem' }}
          >
            <InnerCardItem>
              {get(projectDetail, 'configuration.date.pickUpDate', []).sort((d1, d2) => (d1 > d2 ? -1 : 1)).map(
                d => (
                  <span
                    key={d}
                    style={{ minWidth: '220px', marginBottom: '.25rem' }}
                  >
                    <Icon type="calendar" />{' '}
                    {moment(d).format('dddd, MMMM, D, YYYY')}
                  </span>
                )
              )}
            </InnerCardItem>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card
            loading={status === 'PENDING'}
            title="Logistics"
            bordered={true}
            style={{ marginBottom: '.75rem' }}
          >
            <InnerCardItem>
              <strong>Residence type:</strong>
              {get(projectDetail, 'configuration.logistics.residenceType')}
            </InnerCardItem>
            <InnerCardItem>
              <strong>Pick-up access:</strong>
              {renderAccessType(get(projectDetail, 'configuration.logistics.pickUpAccess'))}
            </InnerCardItem>
            <InnerCardItem>
              <strong>Delivery access:</strong>
              {renderAccessType(get(projectDetail, 'configuration.logistics.deliveryAccess'))}
            </InnerCardItem>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <Card
            loading={status === 'PENDING'}
            title="Items"
            bordered={true}
            style={{ marginBottom: '.75rem' }}
          >
            <InnerCardItem>
              <strong>Special care:</strong>
              <span>
                {renderItems(
                  get(projectDetail, 'configuration.items.specialCare')
                )}
              </span>
            </InnerCardItem>
            <Divider />
            <InnerCardItem>
              <strong>Appliances:</strong>
              <span>
                {renderItems(
                  get(projectDetail, 'configuration.items.appliances')
                )}
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
        </Col>
      </Row>
    </div>
  );
};



export default withStateHandlers(
  { distance: undefined },
  { setDistance: () => distance => ({ distance }) }
)(ConfigurationDetail);
