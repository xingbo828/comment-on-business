import React from 'react';
import { Card, Steps, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom'
const FormItem = Form.Item;

const Step = Steps.Step;

const renderForm = (step, project, form) => {
  return (
    <Card title="" bordered={false}>
    <Form onSubmit={this.handleSubmit} hideRequiredMark >
      <FormItem {...formItemLayout} label="Estimated Price">
      {form.getFieldDecorator('estimatedPrice', {
        rules: [{ required: true, message: 'Please input your price!' }],
      })(
        <Input placeholder="Estimated Price" />
      )}
    </FormItem>
    <FormItem {...formItemLayout} label="Notes">
      {form.getFieldDecorator('notes')(
        <Input placeholder="Notes" />
      )}
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        htmlType="submit"
      >
        Accept
      </Button>
      <Button
        type="primary"
        htmlType="submit"
      >
        Reject
      </Button>
    </FormItem>
    </Form>
    </Card>
  );
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

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

const ProjectDetail = ({project, form}) => {
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
  
  const step = project && project.step || 0;

  return (
    <div>
      <h1>Project Detail</h1>
      <Card title="Project Progress" bordered={true}>
        <Steps current={step}>
          <Step title="Pending" />
          <Step title="Waiting for Confirmation" />
          <Step title="Completed" />
          <Step title="Rejected" />
        </Steps>
      </Card>
      {renderForm(step, project, form)}
      
      {renderProjectDetail(project)}
    </div>
  );
};



export default ProjectDetail;
