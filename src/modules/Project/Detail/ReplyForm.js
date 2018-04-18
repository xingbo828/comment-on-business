import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Card, Form, Input, InputNumber, Button, Row, Col, Checkbox } from 'antd';
import { compose, branch, renderNothing, withProps } from 'recompose';
import { replyToLead } from '../projectAction';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const ReplyForm = ({ form, submitForm, project }) => {
  const dateOptions = project.projectDetail.configuration.date.pickUpDate.map(date => {
    return moment(date);
  }).sort((left, right) => {
    return left - right;
  }).map(date => {
    return {label: date.format('dddd, MMMM Do YYYY'), value: date.format('YYYYMMDD')};
  });

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
      <Form onSubmit={handleSubmit(true)} hideRequiredMark>
        <FormItem {...formItemLayout} label="Estimated Price">
          {form.getFieldDecorator('estimatedPrice', {
            rules: [{ required: true, message: 'Please input your price!' }]
          })(
            <InputNumber
              style={{width: '100%'}}
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              placeholder="Estimated Price"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Notes">
          {form.getFieldDecorator('notes')(
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              placeholder="Notes"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Pick Up Dates">
          {form.getFieldDecorator('pickUpDates', {
            rules: [{ required: true, message: 'Please input your pickup date!' }]
          })(
            <CheckboxGroup options={dateOptions} />
          )}
        </FormItem>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Accept
            </Button>
            <Button
              type="danger"
              style={{ marginLeft: 8 }}
              onClick={handleSubmit(false)}
            >
              Reject
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

const mapDispatchToProps = dispatch => ({
  replyToLead: (providerId, projectId, payload, accept) =>
    dispatch(replyToLead(providerId, projectId, payload, accept))
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  branch(props => props.project.status !== 'LOADED', renderNothing),
  branch(prop => prop.currentStep !== 0, renderNothing),
  withProps(props => ({
    submitForm: async (payload, accept) => {
      const t = await props.replyToLead({
        providerId: props.selectedProviderProfile.id,
        projectId: props.match.params.projectId,
        payload,
        accept
      });
      console.log('t', t);
    }
  })),
  Form.create({})
);

export default enhance(ReplyForm);
