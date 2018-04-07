import React from 'react'
import { connect } from 'react-redux';
import { Card, Steps, Form, Input, Button } from 'antd';
import { compose, branch, renderNothing, withProps } from 'recompose';
import { getProject, replyToLead } from '../projectAction';
const FormItem = Form.Item;

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

const ReplyForm = ({form, submitForm}) => {
  const handleSubmit = accept => e => {
    e.preventDefault();
    if (accept) {
      return form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          submitForm(values, accept || false);
        }
      });
    }
    return submitForm({}, accept);
  };
  return (
    <Card title="" bordered={false}>
        <Form onSubmit={handleSubmit(true)} hideRequiredMark >
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
        <FormItem {...formItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
          >
            Accept
          </Button>
          <Button onClick={handleSubmit(false)}
          >
            Reject
          </Button>
        </FormItem>
      </Form>
      </Card>
  )
}

const mapDispatchToProps = dispatch => ({
  getProject: (providerId, projectId) => dispatch(getProject(providerId, projectId)),
  replyToLead: (providerId, projectId, payload, accept) => dispatch(replyToLead(providerId, projectId, payload, accept)),
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  branch(prop => prop.currentStep !== 0, renderNothing),
  withProps(props => ({
    submitForm: async (payload, accept) => {
      await props.replyToLead({providerId: props.selectedProviderProfile.id, projectId: props.match.params.projectId, payload, accept});
      await props.getProject(props.selectedProviderProfile.id, props.match.params.projectId);
    }
  })),
  Form.create({})
);

export default enhance(ReplyForm)
