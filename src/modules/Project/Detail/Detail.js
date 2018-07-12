import React, { Component } from 'react';
import ReplyForm from './ReplyForm';
import ConfigurationDetail from './ConfigurationDetail';
import ContactInfoCard from './ContactInfoCard';
import Hint from './Hint';
import Steps from './Steps';

class ProjectDetail extends Component {
  render() {
    const {project, selectedProviderProfile, match, location: { state : { projectType }}} = this.props;
    return (
      <div>
        <h1>Project Detail</h1>
        <Steps project={project} projectType={projectType} />
        <Hint project={project} projectType={projectType} />
        <ContactInfoCard project={project} />
        <ReplyForm  project={project} selectedProviderProfile={selectedProviderProfile} match={match} projectType={projectType} />
        <ConfigurationDetail project={project} projectType={projectType} />
      </div>
    );
  }
}


export default ProjectDetail;
