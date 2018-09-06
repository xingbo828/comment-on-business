import React, { PureComponent } from 'react';
import { Button, Tooltip, Icon, Row, Col, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';

import get from 'lodash/get';
import truncate from 'lodash/truncate';
import toUpper from 'lodash/toUpper';

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
      handleEditNotes,
      handleArchive,
      handleRestore,
      hideNotesFormDrawer,
      updateProjectNotes,
      selectedProviderProfile,
      match,
      location: {
        state: { projectType }
      }
    } = this.props;
    return (
      <React.Fragment>
        <Row type="flex" justify="space-between">
          <Col>
            <Link to="/projects">
              <Icon type="left" /> Back to overview
            </Link>
          </Col>
          <Col>
            <h1 style={{ fontSize: '1.325rem' }}>
              Project:{' '}
              {toUpper(
                truncate(get(project, 'projectDetail.id'), {
                  length: 6,
                  omission: ''
                })
              )}
            </h1>
            {get(project, 'projectDetail.receiver.status') === 'INACTIVE' && (
              <Tag color="#f50">Archived</Tag>
            )}
          </Col>
        </Row>
        <Divider style={{marginTop: 0}} />
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
        <div
          style={{
            width: 120,
            position: 'fixed',
            justifyContent: 'space-between',
            display: 'flex',
            bottom: 20,
            right: 60,
            zIndex: 999
          }}
        >
          <Tooltip placement="top" title="view / edit my notes">
            <Button
              onClick={handleEditNotes}
              style={{
                width: 50,
                height: 50,
                fontSize: '26px',
                lineHeight: 2.2
              }}
              type="primary"
              shape="circle"
              icon="form"
              size="large"
            />
          </Tooltip>
          {get(project, 'projectDetail.receiver.status') !== 'INACTIVE' && (
            <Tooltip placement="top" title="archive project">
              <Button
                onClick={handleArchive}
                style={{
                  width: 50,
                  height: 50,
                  fontSize: '26px',
                  lineHeight: 2.2
                }}
                type="danger"
                shape="circle"
                icon="delete"
                size="large"
              />
            </Tooltip>
          )}
          {get(project, 'projectDetail.receiver.status') === 'INACTIVE' && (
            <Tooltip placement="top" title="restore project">
              <Button
                onClick={handleRestore}
                style={{
                  width: 50,
                  height: 50,
                  fontSize: '26px',
                  lineHeight: 2.2,
                  backgroundColor: '#52c41a',
                  borderColor: '#52c41a'
                }}
                type="primary"
                shape="circle"
                icon="clock-circle-o"
                size="large"
              />
            </Tooltip>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ProjectDetail;
