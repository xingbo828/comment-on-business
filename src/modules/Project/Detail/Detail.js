import React, { Component } from 'react';
import { Card, Steps, Input, Button } from 'antd';
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom';
import ReplyForm from './ReplyForm';

const Step = Steps.Step;



const renderProjectDetail = (project) => {
  if (!project || !project.configuration) {
    return;
  }
  return (
    <Card title="Project Details" bordered={true}>
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

class ProjectDetail extends Component {

  // renderForm = (step) => {
  //   const {project, form} = this.props;
  //   return (
  //     <Card title="" bordered={false}>
  //       <Form onSubmit={this.handleSubmit(true)} hideRequiredMark >
  //         <FormItem {...formItemLayout} label="Estimated Price">
  //         {form.getFieldDecorator('estimatedPrice', {
  //           rules: [{ required: true, message: 'Please input your price!' }],
  //         })(
  //           <Input placeholder="Estimated Price" />
  //         )}
  //       </FormItem>
  //       <FormItem {...formItemLayout} label="Notes">
  //         {form.getFieldDecorator('notes')(
  //           <Input placeholder="Notes" />
  //         )}
  //       </FormItem>
  //       <FormItem {...formItemLayout}>
  //         <Button
  //           type="primary"
  //           htmlType="submit"
  //         >
  //           Accept
  //         </Button>
  //         <Button onClick={this.handleSubmit(false)}
  //         >
  //           Reject
  //         </Button>
  //       </FormItem>
  //     </Form>
  //     </Card>
  //   );
  // }

  render() {
    const {project, currentStep, isRejected, selectedProviderProfile, match} = this.props;

    return (
      <div>
        <h1>Project Detail</h1>
        <Card title="Project Progress" bordered={true}>
          {renderSteps(currentStep, isRejected)}
        </Card>
        <ReplyForm currentStep={currentStep} project={project} selectedProviderProfile={selectedProviderProfile} match={match} />

        {renderProjectDetail(project)}
      </div>
    );
  }
}


export default ProjectDetail;
