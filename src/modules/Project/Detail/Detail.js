import React, { Component } from 'react';
import { Card, Steps, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom'
const FormItem = Form.Item;

const Step = Steps.Step;

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

class ProjectDetail extends Component {

  renderForm = (step) => {
    const {project, form} = this.props;
    return (
      <Card title="" bordered={false}>
      <Form onSubmit={this.handleSubmit(true)} hideRequiredMark >
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
        <Button onClick={this.handleSubmit(false)}
        >
          Reject
        </Button>
      </FormItem>
      </Form>
      </Card>
    );
  }
  handleSubmit = accept => e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submitForm(values, accept || false);
      }
    });
  };
  render() {
    const {project, form, submitForm} = this.props;
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
        {this.renderForm(step, project)}

        {renderProjectDetail(project)}
      </div>
    );
  }
}


export default ProjectDetail;
