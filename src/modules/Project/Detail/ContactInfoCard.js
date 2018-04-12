import React from 'react';
import { Card, Row, Col } from 'antd';
import { compose, renderNothing, branch } from 'recompose';
import get from 'lodash/get';

const ContactInfoCard = ({ project: { projectDetail } }) => {
  return (
      <Card
        title="Customer contact information"
        bordered={true}
        style={{ marginTop: 20 }}
      >
        <Row style={{ marginBottom: 12 }}>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Phone number:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
            <a href={`tel:${get(projectDetail, 'owner.phone')}`}>
              {get(projectDetail, 'owner.phone')}
            </a>
          </Col>
        </Row>
        <Row style={{ marginBottom: 12 }}>
          <Col xs={{ span: 8 }} md={{ span: 6 }}>
            <strong>Email:</strong>
          </Col>
          <Col xs={{ span: 16 }} md={{ span: 18 }}>
            <a href={`mailto:${get(projectDetail, 'owner.email')}`}>
              {get(projectDetail, 'owner.email')}
            </a>
          </Col>
        </Row>
      </Card>
  );
};

const enhance = compose(
  branch(props => props.project.status !== 'LOADED', renderNothing),
  branch(
    props => props.project.projectDetail.receiver.status !== 'confirmed',
    renderNothing
  )
);

export default enhance(ContactInfoCard);
