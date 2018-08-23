import React, { PureComponent } from 'react';
import { Menu, Dropdown, Icon, Row, Col, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';

import get from 'lodash/get';
// import ReplyForm from './ReplyForm';
import ConfigurationDetail from './ConfigurationDetail';
import ContactInfoCard from './ContactInfoCard';
// import Hint from './Hint';
// import Steps from './Steps';
import NotesForm from './NotesForm';

class ProjectDetail extends PureComponent {
  render() {
    const {
      project,
      isNotesFormDrawerVisible,
      handleMenuClick,
      hideNotesFormDrawer,
      updateProjectNotes,
      selectedProviderProfile,
      match,
      location: {
        state: { projectType }
      }
    } = this.props;
    const actionMenu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="notes" style={{ padding: '1rem' }}>
          <Icon style={{ fontSize: 18, marginRight: 8 }} type="edit" />
          Add Notes
        </Menu.Item>
        <Menu.Divider />
        {get(project, 'projectDetail.receiver.status') !== 'INACTIVE' && <Menu.Item key="archive" style={{ padding: '1rem' }}>
          <Icon style={{ fontSize: 18, marginRight: 8 }} type="delete" />
          Archive
        </Menu.Item>}
        {get(project, 'projectDetail.receiver.status') === 'INACTIVE' && <Menu.Item key="restore" style={{ padding: '1rem' }}>
          <Icon style={{ fontSize: 18, marginRight: 8 }} type="clock-circle-o" />
          Restore
        </Menu.Item>}
      </Menu>
    );
    return (
      <React.Fragment>
        <Row style={{marginBottom: '1rem'}}>
          <Col>
            <Link to="/projects">
              <Icon type="left" /> Back to overview
            </Link>
          </Col>
        </Row>
        <Row type="flex" justify="space-between">
          <Col>
            <h1 style={{ fontSize: '1.325rem'}}>Project: {get(project, 'projectDetail.id')}</h1>
            {get(project, 'projectDetail.receiver.status') === 'INACTIVE' && <Tag color="#f50">Archived</Tag> }
          </Col>
          <Col>
            <Dropdown
              overlay={actionMenu}
              trigger={['click']}
              placement="bottomRight"
            >
              <Icon type="bars" style={{ fontSize: 30, cursor: 'pointer' }} />
            </Dropdown>
          </Col>
        </Row>
        <Divider />
        {/* <Steps project={project} projectType={projectType} /> */}
        {/* <Hint project={project} projectType={projectType} /> */}
        <ContactInfoCard project={project} />
        {/* <ReplyForm
          project={project}
          selectedProviderProfile={selectedProviderProfile}
          match={match}
          projectType={projectType}
        /> */}
        <ConfigurationDetail project={project} projectType={projectType} />
        <NotesForm
          notes={get(project, 'projectDetail.receiver.notes')}
          projectId={match.params.projectId}
          providerId={selectedProviderProfile.id}
          updateProjectNotes={updateProjectNotes}
          isNotesFormDrawerVisible={isNotesFormDrawerVisible}
          hideNotesFormDrawer={hideNotesFormDrawer}
        />
      </React.Fragment>
    );
  }
}

export default ProjectDetail;
