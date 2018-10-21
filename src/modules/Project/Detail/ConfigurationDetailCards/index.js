import React from 'react';
import { Row, Col} from 'antd';

import AddressCard from './AddressCard';
import ContactInfoCard from './ContactInfoCard';
import PickDateCard from './PickDateCard';
import PickUpCard from './DeliveryCard'
import DeliveryCard from './PickUpCard'
import ItemsCard from './ItemsCard'


const ConfigurationDetail = ({
  projectType,
  project: { status, projectDetail }
}) => {
  return (
    <div style={{ background: 'rgb(240, 242, 245)', padding: '1rem' }}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <AddressCard projectDetail={projectDetail} status={status} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <ContactInfoCard
            projectDetail={projectDetail}
            status={status}
            projectType={projectType}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <PickDateCard projectDetail={projectDetail} status={status} />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <PickUpCard projectDetail={projectDetail} status={status}/>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <DeliveryCard projectDetail={projectDetail} status={status}/>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <ItemsCard projectDetail={projectDetail} status={status}/>
        </Col>
      </Row>
    </div>
  );
};

export default ConfigurationDetail;
