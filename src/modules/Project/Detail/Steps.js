import React from 'react';
import { Card, Steps, Icon } from 'antd';
import { compose, renderNothing, branch } from 'recompose';

const Step = Steps.Step;

const ProjectSteps = ({ project }) => {
  const renderSteps = (projectStatus, providerStatus) => {
  // customer has picked the provider
  if (projectStatus === 'completed') {
    if (providerStatus === 'confirmed') {
      return (
        <Steps current={2}>
          <Step title='Pending' />
          <Step title='Waiting for response' />
          <Step title='Confirmed' icon={<Icon type="phone" />}/>
        </Steps>
      );
    } 
  } 
  // customer has rejected the provider
  else if (projectStatus === 'rejected') {
    return (
      <Steps current={1} status='finish' style={{width: '50%'}}>
        <Step title='Pending' />
        <Step title='Closed' />
      </Steps>
    );
  }

  // customer hasn't picked any provider
  else {
    if (providerStatus === 'sent') {
      return (
        <Steps current={0}>
          <Step title='Pending' />
          <Step title='Waiting for response'/>
          <Step title='Confirmed' icon={<Icon type="phone" />}/>
        </Steps>
      );
    } else if (providerStatus === 'accept') {
      return (
        <Steps current={1}>
          <Step title='Pending' />
          <Step title='Waiting for response' icon={<Icon type="loading" />}/>
          <Step title='Confirmed' icon={<Icon type="phone" />}/>
        </Steps>
      );

    } else if (providerStatus === 'reject') {
      return (
        <Steps current={1} status='error' style={{width: '50%'}}>
          <Step title='Pending' />
          <Step title='Rejected' />
        </Steps>
      );
    }
  }
}

  return (
    <Card loading={project.status==='PENDING'} title="Project Progress" bordered={true}>
      {renderSteps(project.projectDetail.status, project.projectDetail.receiver.status)}
    </Card>
  );
};

const enhance = compose(
  branch(props => props.projectType === 'DIRECT', renderNothing),
  branch(props => props.project.status !== 'LOADED', renderNothing)
);

export default enhance(ProjectSteps);