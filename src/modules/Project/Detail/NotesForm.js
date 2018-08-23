import React from 'react';
import { Drawer, Form, Row, Col, Button, Input, message } from 'antd';

const NotesForm = ({
  form,
  updateProjectNotes,
  projectId,
  providerId,
  isNotesFormDrawerVisible,
  hideNotesFormDrawer
}) => {
  const { getFieldDecorator } = form;
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await updateProjectNotes(
            Object.assign(values, { projectId, providerId })
          );
          message.success('Notes attached');
          hideNotesFormDrawer();
        } catch (err) {
          message.error('Something went wrong');
        }
      }
    });
  };
  return (
    <Drawer
      title="My Notes"
      placement="right"
      width={500}
      onClose={hideNotesFormDrawer}
      visible={isNotesFormDrawerVisible}
    >
      <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              {getFieldDecorator('notes', {})(
                <Input.TextArea
                  autoFocus
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
            onClick={hideNotesFormDrawer}
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
      notes: Form.createFormField({ value: props.notes })
    };
  }
})(NotesForm);
