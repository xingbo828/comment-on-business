import React from 'react';
import { Alert } from 'antd';
import { compose, renderNothing, branch } from 'recompose';

const Hint = ({ project }) => {

  const getTypeAndDesc = (status) => {
    if(status === 'confirmed') {
      return {
        type: 'success',
        message: 'Customer confirmed',
        description: 'Please contact the customer in a timely manner with the contact information provided below.'
      }
    } else if(status === 'sent') {
      return {
        type: 'warning',
        message: 'New project',
        description: 'Please review the project detail and rely to the customer.'
      }
    } else if(status === 'accept') {
      return {
        type: 'info',
        message: 'Reply sent',
        description: 'Waiting for customer response.'
      }
    } else if(status === 'reject') {
      return {
        type: 'error',
        message: 'Project rejected',
        description: 'You have rejected this project.'
      }
    }
  }
  return (
    <Alert
      style={{marginTop: 20}}
      {...getTypeAndDesc(project.projectDetail.receiver.status)}
      showIcon
    />
  );
};

const enhance = compose(
  branch(props => props.project.status !== 'LOADED', renderNothing)
);

export default enhance(Hint);