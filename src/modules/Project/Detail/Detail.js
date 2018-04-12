import React, { Component } from 'react';
import { Card, Steps, Input, Button, List } from 'antd';
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom';
import ReplyForm from './ReplyForm';

const Step = Steps.Step;



const renderProjectDetail = (project, isRejected, currentStep) => {
  if (!project || !project.configuration) {
    return;
  }
  return (
    <Card title="Project Details" bordered={true}>
      {renderAcceptInfo(project, isRejected, currentStep)}
      <span>Date: {project.configuration.dateTime.pickUpDate}</span>
    </Card>
  );

}

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
      <Step title='Waiting for Confirmation' />
      <Step title='Completed' />
    </Steps>
  );
}

const renderAcceptInfo = (project, isRejected, currentStep) => {
  debugger;
  if (!isRejected && currentStep !== 0) {
    const data = ["Estimated Price: " + project.receiver.estimatedPrice, "Notes: " + (project.receiver.text || "")];
    return (
      <List
        header={<div>My Response</div>}
        bordered
        dataSource={data}
        renderItem={item => (<List.Item>{item}</List.Item>)}
      />
    );
  }
}

class ProjectDetail extends Component {
  render() {
    const {project, currentStep, isRejected, selectedProviderProfile, match} = this.props;

    return (
      <div>
        <h1>Project Detail</h1>
        <Card title="Project Progress" bordered={true}>
          {renderSteps(currentStep, isRejected)}
        </Card>
        <ReplyForm currentStep={currentStep} project={project} selectedProviderProfile={selectedProviderProfile} match={match} />

        {renderProjectDetail(project, isRejected, currentStep)}
      </div>
    );
  }
}


export default ProjectDetail;
