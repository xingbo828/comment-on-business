import React, { Component } from 'react';
import { Card, Steps, Icon } from 'antd';
import ReplyForm from './ReplyForm';
import ConfigurationDetail from './ConfigurationDetail';
import ContactInfoCard from './ContactInfoCard';
import Hint from './Hint';

const Step = Steps.Step;


const renderSteps = (currentStep, isRejected) => {
  if (isRejected) {
    return (
      <Steps current={currentStep} status='error' style={{width: '50%'}}>
        <Step title='Pending' />
        <Step title='Rejected' />
      </Steps>
    );
  }
  return (
    <Steps current={currentStep}>
      <Step title='Pending' />
      <Step title='Waiting for response' icon={currentStep=== 1 && <Icon type="loading" />}/>
      <Step title='Confirmed' icon={<Icon type="phone" />}/>
    </Steps>
  );
}

class ProjectDetail extends Component {
  render() {
    const {project, currentStep, isRejected, selectedProviderProfile, match} = this.props;

    return (
      <div>
        <h1>Progress & detail</h1>
        <Card loading={project.status==='PENDING'} title="Project Progress" bordered={true}>
          {renderSteps(currentStep, isRejected)}
        </Card>
        <Hint project={project} />
        <ContactInfoCard project={project} />
        <ReplyForm currentStep={currentStep} project={project} selectedProviderProfile={selectedProviderProfile} match={match} />
        <ConfigurationDetail project={project} />
        
      </div>
    );
  }
}


export default ProjectDetail;
