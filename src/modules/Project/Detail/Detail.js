import React, { PureComponent } from 'react';
import { Button, Tooltip, Icon, Row, Col, Divider, Tag } from 'antd';

import get from 'lodash/get';
import truncate from 'lodash/truncate';
import toUpper from 'lodash/toUpper';

// import ReplyForm from './ReplyForm';
import ConfigurationDetail from './ConfigurationDetail';
import ContactInfoCard from './ContactInfoCard';
// import Hint from './Hint';
// import Steps from './Steps';
import EditForm from './EditForm';

class ProjectDetail extends PureComponent {
  render() {
    const {
      project,
      history,
      isEditFormDrawerVisible,
      handleEdit,
      handleArchive,
      handleRestore,
      hideEditFormDrawer,
      updateProject,
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
            <a onClick={history.goBack}>
              <Icon type="left" /> Back
            </a>
          </Col>
          <Col>
            {get(project, 'projectDetail.receiver.status') === 'INACTIVE' && (
              <Tag color="#f50">Archived</Tag>
            )}
            <span><h1 style={{ fontSize: '1.325rem' }}>
              Project:{' '}
              {toUpper(
                truncate(get(project, 'projectDetail.id'), {
                  length: 6,
                  omission: ''
                })
              )}
            </h1></span>
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
        <EditForm
          notes={get(project, 'projectDetail.receiver.notes')}
          date={get(project, 'projectDetail.receiver.date')}
          projectId={match.params.projectId}
          providerId={selectedProviderProfile.id}
          updateProject={updateProject}
          isEditFormDrawerVisible={isEditFormDrawerVisible}
          hideEditFormDrawer={hideEditFormDrawer}
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
          <Tooltip placement="top" title="Add to calendar">
            <Button
              onClick={handleEdit}
              style={{
                width: 50,
                height: 50,
                fontSize: '26px',
                lineHeight: 2.2,
                boxShadow: '2px 2px 3px #999'
              }}
              type="primary"
              shape="circle"
              icon="calendar"
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
                  lineHeight: 2.2,
                  boxShadow: '2px 2px 3px #999'
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
                  borderColor: '#52c41a',
                  boxShadow: '2px 2px 3px #999'
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
