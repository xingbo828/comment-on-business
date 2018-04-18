import React, { Component } from 'react';
import ReplyForm from './ReplyForm';
import ConfigurationDetail from './ConfigurationDetail';
import ContactInfoCard from './ContactInfoCard';
import Hint from './Hint';
import Steps from './Steps';

class ProjectDetail extends Component {
  render() {
    const {project, selectedProviderProfile, match} = this.props;
    return (
      <div>
        <h1>Progress & detail</h1>
        <Steps project={project} />
        <Hint project={project} />
        <ContactInfoCard project={project} />
        <ReplyForm  project={project} selectedProviderProfile={selectedProviderProfile} match={match} />
        <ConfigurationDetail project={project} />
      </div>
    );
  }
}


export default ProjectDetail;
