import React from 'react';
import { Card } from 'antd';
import get from 'lodash/get';


import { InnerCardItem } from './styles';

const ContactInfoCard = ({ projectDetail, projectType, status }) => {
  return (
      <Card
        loading={status === 'PENDING'}
        title="Customer contact information"
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
  );
};

export default ContactInfoCard;
