import React from 'react';
import withDashboardLayout from '../Common/withDashboardLayout';
import { Route, Switch } from 'react-router-dom';
import ProjectOverview from './Overview';
import ProjectDetail from './Detail';

const Project = () => {
  return (
    <Switch>
      <Route exact path="/projects" component={ProjectOverview} />
      <Route path="/projects/:projectId" component={ProjectDetail} />
    </Switch>
  );
};

export default withDashboardLayout(Project);
