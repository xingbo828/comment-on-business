import React from 'react';
import { Card, Row, Col, Icon, Badge } from 'antd';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

const ConfigurationDetail = ({ project: { status, projectDetail } }) => {

  const renderItems = (items) => {
    if(isNil(items) || isEmpty(items)) {
      return 'N/A';
    }
    console.log(items)
    return Object.keys(items).map(key => (<div>{key} <Badge style={{ backgroundColor: '#1890ff' }} count={<span>x {items[key]}</span>} /></div>));
   }


  return (
    <React.Fragment>
      <Card
        loading={status === 'PENDING'}
        title="Customer basic information"
        bordered={true}
        style={{ marginTop: 20 }}
      >
        <Row style={{ marginBottom: 12 }}>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Name:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
            {get(projectDetail, 'owner.displayName')}
          </Col>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Notes:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
            {get(projectDetail, 'configuration.additionalNotes') || 'N/A'}
          </Col>
        </Row>
      </Card>
      <Card
        loading={status === 'PENDING'}
        title="Customer address information"
        bordered={true}
        style={{ marginTop: 20 }}
      >
        <Row style={{ marginBottom: 12 }}>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Pick-up address:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
          <Icon type="home" /> {get(
              projectDetail,
              'configuration.addresses.formattedPickUpAddress'
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Delivery address:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
          <Icon type="environment-o" /> {get(
              projectDetail,
              'configuration.addresses.formattedDeliveryAddress'
            )}
          </Col>
        </Row>
      </Card>
      <Card
        style={{ marginTop: 20 }}
        loading={status === 'PENDING'}
        title="Customer preferred moving dates"
        bordered={true}
      >
        <Row>
          {get(projectDetail, 'configuration.date.pickUpDate', []).map(d => (
            <Col
              key={d}
              xs={{ span: 10 }}
              md={{ span: 8 }}
              style={{ marginBottom: 12 }}
            >
              <Icon type="calendar" /> {moment(d).format('dddd, MMMM, D, YYYY')}
            </Col>
          ))}
        </Row>
      </Card>
      <Card
        style={{ marginTop: 20 }}
        loading={status === 'PENDING'}
        title="Customer logistics information"
        bordered={true}
      >
        <Row>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Residence type:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
            {get(projectDetail, 'configuration.logistics.residenceType')}
          </Col>
        </Row>
      </Card>
      <Card
        loading={status === 'PENDING'}
        title="Items information"
        bordered={true}
        style={{ marginTop: 20 }}
      >
      <Row style={{ marginBottom: 12 }}>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Special care:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
            {renderItems(get(projectDetail, 'configuration.items.specialCare'))}
          </Col>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Appliances:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
            {renderItems(get(projectDetail, 'configuration.items.appliances'))}
          </Col>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Decore:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
            {renderItems(get(projectDetail, 'configuration.items.decore'))}
          </Col>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Additional items information:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
            {get(projectDetail, 'configuration.items.otherItems') || 'N/A'}
          </Col>
        </Row>
    </Card>
    </React.Fragment>
  );
};

export default ConfigurationDetail;
