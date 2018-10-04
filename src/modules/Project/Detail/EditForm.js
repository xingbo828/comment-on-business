import React from 'react';
import { Drawer, Form, Row, Col, Button, Input, message, DatePicker } from 'antd';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment'

const EditForm = ({
  form,
  updateProject,
  projectId,
  providerId,
  isEditFormDrawerVisible,
  hideEditFormDrawer
}) => {
  const { getFieldDecorator } = form;
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const status = isEmpty(values.date) ? 'PENDING' : 'ACTIVE'
          const detail = Object.assign(values, { status });
          await updateProject({ detail, projectId, providerId });
          message.success('Successfully saved');
          hideEditFormDrawer();
        } catch (err) {
          message.error('Something went wrong :(');
        }
      }
    });
  };
  return (
    <Drawer
      title="Add to calendar"
      placement="right"
      width={500}
      destroyOnClose
      onClose={hideEditFormDrawer}
      visible={isEditFormDrawerVisible}
    >
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Pick-up date & time">
              {getFieldDecorator('date', {})(
                <DatePicker
                  style={{ width: '100%'}}
                  size="large"
                  placeholder="Select project pick-up date & time"
                  autoFocus
                  showTime={{format: 'HH:mm', minuteStep: 15}}
                  format="YYYY-MM-DD HH:mm"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Notes">
              {getFieldDecorator('notes', {})(
                <Input.TextArea
                  rows={10}
                  placeholder="please enter your notes here"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px'
          }}
        >
          <Button
            style={{
              marginRight: 8
            }}
            onClick={hideEditFormDrawer}
          >
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default Form.create({
  mapPropsToFields(props) {
    return {
      notes: Form.createFormField({ value: props.notes }),
      date: Form.createFormField({ value: moment(props.date) }),
    };
  }
})(EditForm);
