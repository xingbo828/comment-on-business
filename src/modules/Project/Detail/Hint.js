import React from 'react';
import { Alert } from 'antd';
import { compose, renderNothing, branch } from 'recompose';

const Hint = ({ project }) => {
  const getTypeAndDesc = (projectStatus, providerStatus) => {
    // customer has picked the provider
    if (projectStatus === 'completed') {
      if (providerStatus === 'confirmed') {
        return {
          type: 'success',
          message: 'Customer confirmed',
          description:
            'Please contact the customer in a timely manner with the contact information provided below.'
        };
      } 
    } 
    // customer has rejected the provider
    else if (projectStatus === 'rejected') {
      return {
        type: 'info',
        message: 'Project is closed',
        description:
          'Customer has chosen a provider and project is closed.'
      };
    }
    // customer hasn't picked any provider
    else {
       if (providerStatus === 'sent') {
        return {
          type: 'warning',
          message: 'New project',
          description:
            'Please review the project detail and rely to the customer.'
        };
      } else if (providerStatus === 'accept') {
        return {
          type: 'info',
          message: 'Reply sent',
          description: 'Waiting for customer response.'
        };
      } else if (providerStatus === 'reject') {
        return {
          type: 'error',
          message: 'Project rejected',
          description: 'You have rejected this project.'
        };
      }
    }
  };
  return (
    <Alert
      style={{ marginTop: 20 }}
      {...getTypeAndDesc(
        project.projectDetail.status,
        project.projectDetail.receiver.status
      )}
      showIcon
    />
  );
};

const enhance = compose(
  branch(props => props.project.status !== 'LOADED', renderNothing)
);

export default enhance(Hint);
